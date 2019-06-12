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



app.get('/hello/:id', (req, res) => {
    var id = req.params.id;
    res.send({
        status: 200,
        message: "Hello, "+id+""
    })
})


// when we call /search?s=something , something will be assigned to s
app.get('/search', (req, res) => {
    var searchInput = req.query.s;
    if(searchInput){
    res.send({
        status: 200,
        message: "ok",
        data: searchInput
    })
    }else{
        res.send({
            status: 500,
            error: true,
            message: "you have to provide a search",
        })
    }
})

app.listen(port, () => (console.log("app is running")));