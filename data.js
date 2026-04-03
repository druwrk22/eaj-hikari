const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const creds = require('./credentials.json');

const serviceAccountAuth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1ulnTqo5UjGjjK4eT3cbPG612IRKeYQRX78Z-9kXCsqM', serviceAccountAuth);

async function addApplication(data) {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({
    Name: data.name,
    Age: data.age,
    Nik: data.nik,
    Email: data.email,
    Whatsapp: data.whatsapp,
    Role: data.role,
    Resume: data.resume,
    Stage: 'Decision needed',
    Date: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });
}

module.exports = { addApplication };