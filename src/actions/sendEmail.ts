"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const validateString = (value: unknown, maxLength: number): boolean =>
    typeof value === "string" && value.length <= maxLength;

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    if (typeof error === "object" && error !== null && "message" in error) {
        return String(error.message);
    }

    return "Something went wrong";
};

export const sendEmail = async (formData: FormData) => {
    const { message, senderEmail } = {
        message: formData.get('message'),
        senderEmail: formData.get('senderEmail'),
    };

    if (!validateString(senderEmail, 500)) {
        return { error: "Invalid sender email" };
    }

    if (!validateString(message, 5000)) {
        return { error: "Invalid message" };
    }

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Contact form <onboarding@resend.dev>',
            to: 'josuejero@hotmail.com',
            subject: 'Message from contact form',
            reply_to: senderEmail as string,
            text: message as string,
        });

        return { data };
    } catch (error: unknown) {
        return { error: getErrorMessage(error) };
    }
};
