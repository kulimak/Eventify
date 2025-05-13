const emailService = require('../services/email.service');

// Email küldés API végpontja
const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body; // Az adatokat a frontend küldi

  try {
    await emailService.sendEmail(to, subject, text); // Email küldése
    res.status(200).json({ message: 'Email sikeresen elküldve' });
  } catch (error) {
    res.status(500).json({ message: 'Hiba az email küldésében', error: error.message });
  }
};

module.exports = {
  sendEmail,
};