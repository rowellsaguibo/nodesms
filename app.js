const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

//Init Nexmo
const nexmo = new Nexmo(
  {
    apiKey: '5161abc1',
    apiSecret: 'e3JCFraHRUcbMudL',
  },
  { debug: true }
);

//init app
const app = express();

//template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//Public folder setup
app.use(express.static(__dirname + '/public'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define port
const port = 3000;

//start server
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//Define Index Route
app.get('/', (req, res) => {
  res.render('index');
});

//Catch form submit
app.post('/', (req, res) => {
  //   res.send(req.body);
  //   console.log(req.body);
  const number = req.body.number;
  const text = req.body.text;

  nexmo.message.sendSms(
    '639271481734',
    number,
    text,
    { type: 'unicode' },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    }
  );
});
