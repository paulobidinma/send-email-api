const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oziomaobidinma3@gmail.com', // replace with your Gmail email
    pass: 'Determination@1', // replace with your Gmail password
  },
});

app.post('/send-email', (req, res) => {
  const { username, phoneNumber, email, subject, message } = req.body;

  const mailOptions = {
    from: 'your@gmail.com',
    to: 'oziomaobidinma@gmail.com', // replace with your Gmail email
    subject: `New Contact Form Submission: ${subject}`,
    text: `
      Name: ${username}
      Phone Number: ${phoneNumber}
      Email: ${email}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
