const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./database'); // Import the database module

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/send-email', (req, res) => {
  const { email, videoUrl } = req.body;

  // Check if the email already exists in the database
  db.get('SELECT * FROM submissions WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      // Email already exists
      return res.status(400).json({ error: 'This email address has already been used to submit a video.' });
    }

    // Email does not exist, proceed with email sending and database insertion
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Zionotes Submission Received',
      text: `We have received your submission with the video URL: ${videoUrl}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: error.toString() });
      }

      // Save the submission to the database
      db.run(`INSERT INTO submissions (email, videoUrl) VALUES (?, ?)`, [email, videoUrl], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Email sent and submission saved: ' + info.response });
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
