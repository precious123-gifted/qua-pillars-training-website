import nodemailer from 'nodemailer';

export async function POST(request) {
  const { formData } = await request.json();

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
    from: process.env.EMAIL_USER, // Sender email
    to: 'enquires@qphrf.org', // Enquiry email
    subject: 'New Registration Form Submission', // Email subject
    html: `
      <h1>New Registration Form Submission</h1>
      <p><strong>First Name:</strong> ${formData.firstName}</p>
      <p><strong>Last Name:</strong> ${formData.lastName}</p>
      <p><strong>Company:</strong> ${formData.company}</p>
      <p><strong>Country/City:</strong> ${formData.countryCity}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Is Student:</strong> ${formData.isStudent ? 'Yes' : 'No'}</p>
      <p><strong>Dietary Request:</strong> ${formData.dietaryRequest}</p>
      <p><strong>Payment Amount:</strong> NGN ${formData.paymentAmount.toLocaleString()}</p>
    `,
    attachments: [], // Initialize attachments array
  };

  // If the user is a student and has uploaded a file, add it as an attachment
  if (formData.isStudent && formData.studentId) {
    // Extract the file extension from the original filename
    const fileExtension = formData.studentId.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

    // Ensure the file type is allowed
    if (allowedExtensions.includes(fileExtension)) {
      mailOptions.attachments.push({
        filename: `student_id.${fileExtension}`, // Use the original file extension
        content: formData.studentId.content, // Base64-encoded file content
        encoding: 'base64',
      });
    } else {
      console.error('Invalid file type uploaded:', fileExtension);
      return new Response(JSON.stringify({ message: 'Invalid file type. Allowed types: PDF, JPG, PNG.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

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