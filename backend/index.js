const express = require('express');
const path = require('path');
const mysql = require('mysql');

const qrng = require('./qrng');

const app = express();
const port = 8080;
const app_folder = '../frontend/build';


var dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

dbConnection.connect();


app.use(express.static(app_folder));
app.use(express.json({type: 'application/json'}));

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

app.post('/api/users/add', (req, res) => {
  const name = mysql.escape(req.body.name);
  const email = mysql.escape(req.body.email);
  const password = mysql.escape(req.body.password);
  if (typeof name === 'string' && typeof email === 'string' && typeof password === 'string') {
    dbConnection.query(`SELECT COUNT(Email) FROM Users WHERE Email=${email};`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).send('Failed to check if user with specified email already exists');
        } else {
          console.log(results);
          if (results[0]['COUNT(Email)'] === 0) {
            dbConnection.query(`INSERT INTO Users (Name, Email, DecryptTest) VALUES (${name}, ${email}, AES_ENCRYPT('The quick brown fox jumped over the lazy dog.', UNHEX(SHA2(${password}, 256))));`, 
              (error, results, fields) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Failed to insert user');
                } else {
                  console.log(results);
                  console.log(fields);
                  res.status(201).send('Success');
                }
              }
            );
          } else {
            res.status(409).send('User with specified email already exists');
          }
        }
      });
    
  } else {
    res.status(400).send('Expected JSON {name, email, password}');
  }
});

app.post('/api/coinFlipHistory/add', (req, res) => {
  const body = req.body;
  const userID = body.userID;
  const password = mysql.escape(body.password);
  const dateTime = body.dateTime;
  const outcome = mysql.escape(body.outcome);
  const headsAction = mysql.escape(body.headsAction);
  const tailsAction = mysql.escape(body.tailsAction);
  if (Number.isInteger(userID) && typeof password === 'string' && Number.isInteger(dateTime) 
    && typeof outcome === 'string' && typeof headsAction === 'string' && typeof tailsAction === 'string'
  ) {
    const selector = `AES_DECRYPT(DecryptTest, UNHEX(SHA2(${password}, 256)))`;
    dbConnection.query(`SELECT ${selector} FROM Users WHERE ID=${userID};`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).send('Failed to check validity of password');
        } else {
          const testResult = results[0][selector];
          console.log(testResult);
          if (testResult && testResult.toString('utf-8') === 'The quick brown fox jumped over the lazy dog.') {
            dbConnection.query(`INSERT INTO CoinFlipHistory (UserID, DateTime, Outcome, HeadsAction, TailsAction) `
                            + `VALUES (${userID}, AES_ENCRYPT(${dateTime}, UNHEX(SHA2(${password}, 256))), AES_ENCRYPT(${outcome}, UNHEX(SHA2(${password}, 256))), `
                            + `AES_ENCRYPT(${headsAction}, UNHEX(SHA2(${password}, 256))), AES_ENCRYPT(${tailsAction}, UNHEX(SHA2(${password}, 256))));`,
              (error, results, fields) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Failed to insert new history item');
                } else {
                  console.log(results);
                  res.status(201).send('Success');
                }
              }
            );
          } else {
            res.status(403).send('Wrong password');
          }
        }
      }
    );
    
  } else {
    res.status(400).send('Expected JSON {userID, password, dateTime, outcome, headsAction, tailsAction}');
  }
});

app.listen(port, () => console.log(`Backend listening at port ${port}`));
