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
  const name = req.body.name;
  const email = req.body.email;
  if (typeof name === 'string' && typeof email === 'string') {
    dbConnection.query(`SELECT COUNT(Email) FROM Users WHERE Email="${email}";`,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).send('Failed to check if user with specified email already exists');
        } else {
          console.log(results);
          if (results[0]['COUNT(Email)'] === 0) {
            dbConnection.query(`INSERT INTO Users (Name, Email) VALUES ("${name}", "${email}");`, 
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
    res.status(400).send('Expected JSON Request with "name" and "email" in body');
  }
});

app.listen(port, () => console.log(`Backend listening at port ${port}`));
