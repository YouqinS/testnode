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

//MULTER CONFIG: to get file photos to temp server storage
const multerConfig = {

  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({

    //specify destination
    destination: function(req, file, next){
      next(null, './public/photos');
    },

    //specify the filename to be unique
    filename: function(req, file, next){
      console.log(file);
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split('/')[1];
      //set the file fieldname to a unique name containing the original name, current datetime and the extension.
      next(null, file.fieldname + '-' + Date.now() + '.'+ext);
    }
  }),

  // filter out and prevent non-image files.
  fileFilter: function(req, file, next){
    if(!file){
      next();
    }

    // only permit image mimetypes
    const image = file.mimetype.startsWith('image/');
    if(image){
      console.log('photo uploaded');
      next(null, true);
    }else{
      console.log("file not supported")
      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};


 app.get('/', (req, res) => {
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




//app.post('/upload', upload.single('avatar'), function (req, res) {
  app.post('/upload', multer(multerConfig).single('avatar'),function(req, res){

    // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send("uploadding file");

});

app.post('/profile', (req, res)=>{
  res.send('file was uploaded successfully!');
  console.log(' server upload code');
});



app.listen(3000);
