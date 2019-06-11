const express = require('express')
const app = express()
const port = 3000

// the root URL (/)
app.get('/', (req, res) => res.send("ok"));


app.get('/test',(req, res) => res.send({
    status: 200,
    message: "ok"
}));



// create a Date instance
var today = new Date();
var current_time = today.getHours()+":"+today.getMinutes();


app.get('/time',(req, res) => res.send({
    status: 200,
    message: current_time
}));


app.listen(port, () => (console.log("app is running")));