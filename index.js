'use strict';

console.log('server code working');

const express = require('express'); //require the function from the express library
const app = express(); //create a constant of object express()

const bodyParser = require('body-parser'); //to extract json or text from the request body //https://www.npmjs.com/package/body-parser
app.use(bodyParser.json());

app.use(express.urlencoded()); //https://expressjs.com/en/api.html#express.urlencoded

app.use(express.static('public'));
app.use('/', express.static(__dirname + '/public')); //https://expressjs.com/en/starter/static-files.html


const multer = require('multer');//https://github.com/expressjs/multer
const upload = multer({test:'upload/'});



 app.get('/', (req, res) => { //call function get  //request from client, response from server
   res.send('Hello testing GET REQUEST');
   console.log('server gets called')
 });

app.get('/', function(req, res){
  res.render('task_b.html');
});



app.post('/', (req, res)=>{
  // const test = req.query.test;
  // console.log(test);
  res.send('hello POST');
  console.log('server gets called');
});




app.post('/profile', upload.single('avatar'), function (req, res) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send("uploadding file");

});

app.post('/profile', (req, res)=>{
  res.send('file was uploaded successfully!');
  console.log(' server upload code');
});



app.listen(3000);
