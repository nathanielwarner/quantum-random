const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 8080;
const app_folder = '../frontend/build';

app.use(express.static(app_folder));

app.get('/', (req, res) => {
  res.sendFile(path.join(app_folder, 'index.html'));
});

app.get('/api/qrng', (req, res) => {
  const length = parseInt(req.query.numClasses, 10) - 1;
  const reqUrl = "https://qrng.anu.edu.au/API/jsonI.php?length=" + length + "&type=uint8";
  console.log(reqUrl);
  axios.get(
    reqUrl
  )
    .then(res => res.data)
    .then(
      (result) => {
        console.log(result);
        if (result.success === true && result.type === "uint8" && result.length === length) {
          const mapped = result.data.map(x => x < 128 ? 0 : 1);
          const sum = mapped.reduce((a, b) => a + b);
          res.status(200).send({result: sum});
        } else {
          console.log("Response from quantum API indicates that the operation failed");
          res.status(500).send({result: -2});
        }
      },
      (error) => {
        console.log("Failed to make request to quantum API");
        console.log(error);
        res.status(500).send({result: -1});
      }
    );
});

app.listen(port, () => console.log(`Backend listening at port ${port}`));
