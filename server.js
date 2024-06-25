const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors'); // Import paket cors

const app = express();
const port = 3000;

// Middleware untuk meng-handle body berformat JSON
app.use(bodyParser.json());

// Setup CORS untuk mengizinkan akses dari semua origin
app.use(cors());

// Konfigurasi Twilio
const accountSid = 'ACf8237e6dbbc0735d25f5bda93daef40c'; 
const authToken = 'X8FW2G76SEDRAWQBPZ1XAHZE'; // Ganti dengan Auth Token Anda dari Twilio
const client = twilio(accountSid, authToken);

// Route untuk mengirim pesan WhatsApp
app.post('/send-whatsapp', (req, res) => {
  const { phoneNumber, message } = req.body;

  // Validasi input
  if (!phoneNumber || !message) {
    return res.status(400).json({ success: false, message: 'Nomor telepon dan pesan harus diisi.' });
  }

  // Kirim pesan WhatsApp menggunakan Twilio
  client.messages
    .create({
      body: message,
      from: 'whatsapp:+6282173242194', // Ganti dengan Twilio WhatsApp Number Anda
      to: `whatsapp:${6282173242194}` // Nomor WhatsApp Anda sendiri
    })
    .then(message => {
      console.log('Message sent:', message.sid);
      res.json({ success: true, message: 'Pesan WhatsApp berhasil dikirim.' });
    })
    .catch(error => {
      console.error('Error sending WhatsApp message:', error);
      res.status(500).json({ success: false, message: 'Gagal mengirim pesan WhatsApp.' });
    });
});

// Menjalankan server pada port 3000
app.listen(port, () => {
  console.log(`Server is started at port : ${port}`);
});
