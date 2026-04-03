const express = require('express');
const bodyParser = require('body-parser');
const { addApplication } = require('./data');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('apply', { status: null });
});

app.post('/apply', async (req, res) => {
  try {
    await addApplication(req.body);
    res.render('apply', { status: 'success' });
  } catch (error) {
    res.render('apply', { status: 'error' });
  }
});

app.listen(3000, () => console.log('Server is Running!'));