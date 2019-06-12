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


const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]


// create
app.get('/movies/add',(req, res) => res.send("asdasd"));
// read
app.get('/movies/get', (req, res) => res.send({status:200, data: movies }));
// update
app.get('/movies/edit',(req, res) => res.send("asdasd"));
// delete
app.get('/movies/delete',(req, res) => res.send("asdasd"));


// for later use
// app.get('/movies/get', (req, res)=>{
//     for(let i=0;i<movies.length;i++){
//         res.write(JSON.stringify({status: 200, data: movies[i].title}))
//         res.write("\n")
//     }
//     res.end();
// })


app.listen(port, () => (console.log("app is running")));