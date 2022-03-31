const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 8000


app.get('/main', (req, res) => {
    var dataToSend;
    const python = spawn('python', ['./backend/main.py']);
    python.stdout.on('data', function (data) {
     console.log('Pipe data from python script ...');
     dataToSend = data.toString();
     console.log(dataToSend)
    });
    python.on('close', (code) => {
    console.log('child process close all stdio with code ${code}');
    console.log("data> ", dataToSend);
    res.send(dataToSend)
    });
    
   })


app.listen(8000, () => console.log("App launching in port : 8000!"))