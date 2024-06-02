import nodemailer from 'nodemailer';

// This is an asynchronous function that handles incoming HTTP requests.
// It will be executed when a request is made to the corresponding API endpoint.
export default async function handler(req, res) {
  
  // Check if the request method is POST.
  // The contact form should submit data via a POST request.
  if (req.method === 'POST') {
    // Extract the name, email, and message from the request body.
    const { name, email, message } = req.body;

    // Create a transporter object using the default SMTP transport.
    // This transporter will use Gmail as the email service provider.
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Specify the email service provider.
      auth: {
        // Authenticate using environment variables for security.
        // EMAIL_USER and EMAIL_PASS should be defined in your environment variables.
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the email options.
    // The email will be sent from the user's email address to your email address.
    const mailOptions = {
      from: email, // Sender address (the user's email).
      to: process.env.EMAIL_USER, // List of recipients (your email).
      subject: `Contact form submission from ${name}`, // Subject line.
      text: `You have received a new message from ${name} (${email}):\n\n${message}`, // Plain text body.
    };

    try {
      // Send the email using the transporter object and mail options.
      await transporter.sendMail(mailOptions);
      // If the email is sent successfully, send a JSON response with a success message.
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      // If there is an error sending the email, log the error to the console.
      console.error('Error sending email:', error);
      // Send a JSON response with an error message and a 500 status code.
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    // If the request method is not POST, set the Allow header to 'POST' and send a 405 status code.
    // This informs the client that the method is not allowed.
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
