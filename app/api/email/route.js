import nodemailer from 'nodemailer';

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://qphrf.org',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request) {
  // Ensure CORS is handled
  const headers = {
    'Access-Control-Allow-Origin': 'https://qphrf.org',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const { formData } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PRIVATE_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: 'enquires@qphrf.org',
      subject: 'New Registration Form Submission',
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
    };

    // If the user is a student and has uploaded a file, add it as an attachment
    if (formData.isStudent && formData.studentId) {
      const fileExtension = formData.studentId.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

      if (allowedExtensions.includes(fileExtension)) {
        mailOptions.attachments = [
          {
            filename: `student_id.${fileExtension}`,
            content: formData.studentId.content,
            encoding: 'base64',
          },
        ];
      } else {
        return new Response(JSON.stringify({ message: 'Invalid file type. Allowed types: PDF, JPG, PNG.' }), {
          status: 400,
          headers,
        });
      }
    }

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email.' }), {
      status: 500,
      headers,
    });
  }
}
