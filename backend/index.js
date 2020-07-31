const express = require('express');
const path = require('path');

const qrng = require('./qrng');

const app = express();
const port = 8080;
const app_folder = '../frontend/build';


app.use(express.static(app_folder));

app.get('/', (req, res) => {
  res.sendFile(path.join(app_folder, 'index.html'));
});

app.get('/api/qrng', (req, res) => {
  const numClasses = parseInt(req.query.numClasses, 10);
  qrng.getQuantumRandom(numClasses)
    .then(
      result => {
        res.status(200).send({result: result});
      }
    )
    .catch(
      error => {
        console.log(error);
        res.status(500).send({result: -1});
      }
    );
});

app.listen(port, () => console.log(`Backend listening at port ${port}`));
