var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();


// Basic Configuration ----------------------------------------------
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({
  storage: multer.memoryStorage(),
});

// Endpoints --------------------------------------------------------

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  const response = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  };
  res.json(response);
});


// Listener ----------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
