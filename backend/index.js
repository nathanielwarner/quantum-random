const express = require('express');
const path = require('path');
const axios = require('axios');
const math = require('mathjs');

const app = express();
const port = 8080;
const app_folder = '../frontend/build';

const rnApiDataType = "uint8";
const rnApiRadix = 10;
const rnApiPossibilities = 256;
const rnApiUrl = "https://qrng.anu.edu.au/API/jsonI.php" + "?type=" + rnApiDataType;

app.use(express.static(app_folder));

app.get('/', (req, res) => {
  res.sendFile(path.join(app_folder, 'index.html'));
});

app.get('/api/qrng', (req, res) => {
  const numClasses = parseInt(req.query.numClasses, 10);
  const step = rnApiPossibilities / numClasses;
  if (Number.isInteger(step)) {
    const length = 1;
    const reqUrl = rnApiUrl + "&length=" + length;
    console.log(reqUrl);
    axios.get(
      reqUrl
    )
      .then(res => res.data)
      .then(
        (result) => {
          console.log(result);
          if (result.success === true && result.type === rnApiDataType && result.length === length) {
            const resultInt = parseInt(result.data, rnApiRadix);
            console.log(resultInt);
            const ret = Math.floor(resultInt / step);
            console.log(ret);
            res.status(200).send({result: ret});
          } else {
            console.log("Response from quantum API indicates that the operation failed");
            res.status(500).send({result: -1});
          }
        },
        (error) => {
          console.log("Failed to make request to quantum API");
          console.log(error);
          res.status(500).send({result: -1});
        }
      );
  } else {
    console.log("numClasses does not divide rnApiPossibilities");
    res.status(500).send({result: -1});
  }
  
});

app.listen(port, () => console.log(`Backend listening at port ${port}`));
