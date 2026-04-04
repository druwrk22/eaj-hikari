const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const { addApplication } = require('./data');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('apply', { status: null, errors: [], old: {} });
});

const validateApplication = [
  body('name').trim().notEmpty().withMessage('Nama lengkap wajib diisi'),
  body('age').isInt({ min: 17, max: 60 }).withMessage('Umur harus antara 17-60 tahun'),
  body('nik').isLength({ min: 16, max: 16 }).isNumeric().withMessage('NIK harus 16 digit angka'),
  body('email').isEmail().withMessage('Format email tidak valid').normalizeEmail(),
  body('whatsapp').isMobilePhone('id-ID').withMessage('Gunakan nomor WhatsApp Indonesia yang valid'),
  body('role').notEmpty().withMessage('Pilih salah satu role'),
  body('resume').isURL().withMessage('Sertakan link portfolio/resume yang valid (URL)')
];

app.post('/apply', validateApplication, async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('apply', { 
      status: 'validation-error', 
      errors: errors.array() ,
      old: req.body
    });
  }

  try {
    await addApplication(req.body);
    res.render('apply', { status: 'success', errors: [], old: {} });
  } catch (error) {
    res.render('apply', { status: 'error', errors: [], old: req.body });
  }
});

app.listen(3000, () => console.log('Server is Running!'));