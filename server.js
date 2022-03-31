const express = require('express')
const {PythonShell} = require('python-shell');
const app = express()
const port = 8000


app.get('/main', callPython);

function callPython(req, res) {
    var options = {
        args:
        [
          req.query.funds, // starting funds
          req.query.size, // (initial) wager size
          req.query.count, // wager count — number of wagers per sim
          req.query.sims // number of simulations
        ]
      }
      PythonShell.run('./backend/main.py', options, function (err, data) {
        if (err) res.send(err);
        res.send(data.toString())
        console.log(data)
      });
}

app.listen(8000, () => console.log("App launching in port : 8000!"))