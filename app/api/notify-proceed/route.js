import nodemailer from 'nodemailer';

// Define the POST method explicitly as a named export
export async function POST(request) {
  const { email } = await request.json(); // Extract email from the request body

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail, Outlook, etc.)
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER, // Your email address
      pass: process.env.NEXT_PRIVATE_EMAIL_PASSWORD, // Your email password or app-specific password
    },
  });

  // Prepare the email content
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER, // Sender email
    to: 'enquires@qphrf.org', // Enquiry email
    subject: 'User Clicked Proceed Button', // Email subject
    html: `Email: ${email}`, // Email content
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}