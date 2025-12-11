import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(2000),
  // Good on Edge; works with Upstash over HTTP
  website: z.string().max(0).optional(), // simple honeypot field (leave blank in the UI)
});

// Initialize rate limiter only if Redis is available
let ratelimit: Ratelimit | null = null;
try {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests / minute / IP (tune to your liking)
  });
} catch (error) {
  console.warn("Redis not available for rate limiting:", error);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  
  // Rate limit first (only if rate limiter is available)
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(`contact:${ip}`);
      if (!success) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    } catch (rateLimitError) {
      console.error("Rate limiting error, proceeding without rate limit:", rateLimitError);
      // Continue without rate limiting if Redis is unavailable
    }
  }

  try {
    // Validate input
    const body = await req.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { name, email, message, website } = validationResult.data;

    // honeypot check (if a bot filled it, bail silently)
    if (website && website.trim().length > 0) {
      // Return 204 (no content) as if success, to not alert bots
      return new NextResponse(null, { status: 204 });
    }

    // Compose EmailJS REST request
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID!,
      template_id: process.env.EMAILJS_TEMPLATE_ID!,
      user_id: process.env.EMAILJS_PUBLIC_KEY!, // public key
      accessToken: process.env.EMAILJS_PRIVATE_KEY, // private key (optional but recommended server-side)
      template_params: {
        from_name: name,
        from_email: email,
        message: message,
        to_email: "josue@example.com", // Replace with your email
        reply_to: email,
      },
    };

    // Send email via EmailJS
    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("EmailJS error:", errorText);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { ok: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}