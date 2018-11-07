'use strict';

console.log('hello world');



const express = require('express'); //require the function from the express library   server?
const app = express(); //create a constant of object express()

app.get('/', (req, res) => { //call function get  //request from client, response from server
  res.send('Hello World')
});

app.listen(3000);