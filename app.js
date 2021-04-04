const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`<h1>Hi, I'm going to do some stuff later</h1>`);
});

app.listen(3000, () => {
  console.log('Listening port 3000 now...')
});