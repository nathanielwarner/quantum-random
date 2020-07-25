const express = require('express');
const path = require('path');

const app = express();
const port = 8080;
const app_folder = '../frontend/build';

app.use(express.static(app_folder));

app.get('/', (req, res) => {
  res.sendFile(path.join(app_folder, 'index.html'));
});

app.listen(port, () => console.log(`Backend listening at port ${port}`));
