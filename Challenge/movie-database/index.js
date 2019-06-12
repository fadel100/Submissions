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
app.get('/movies/add?',(req, res) => res.send("asdasd"));

app.get('/movies/create', (req, res) =>{
    var queryTitle = req.query.title;
    var queryYear = req.query.year;
    var queryRating = req.query.rating;

    if(queryRating == "")
        queryRating = 4;

    if(!queryTitle == "" && !queryYear == "" && !queryYear.length != 4 && !isNaN(queryYear)){
    movies.push({
        title: queryTitle,
        year: queryYear*1,
        rating: queryRating*1
    })
    res.send({status:200, data: movies })
    }else{
        res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }
})

// read
app.get('/movies/get', (req, res) => res.send({status:200, data: movies }));



app.get('/movies/read/id/:id', (req, res)=>{
    var id = req.params.id;
    if(id >=0 && id < movies.length ){
        res.send(
            {
                status: 200,
                data: movies[id]
            }
        )
    }else{
        res.send(
            {
                status: 404,
                error: true,
                message: 'the movie '+id+' does not exist'
            }
        )
    }
});




// update
app.get('/movies/edit',(req, res) => res.send("asdasd"));

app.get('/movies/update/:id', (req, res) => {
    var id = req.params.id;
    var queryTitle = req.query.title;
    var queryYear = req.query.year;
    var queryRating = req.query.rating;

    if(queryTitle != undefined && queryTitle != "")
        movies[id].title = queryTitle;
    if(queryYear != undefined && queryYear != "")
        movies[id].year = queryYear;
    if(queryRating != undefined && queryRating != "")
        movies[id].rating = queryRating;

    res.send(movies[id])
})



// delete
app.get('/movies/delete',(req, res) => res.send("asdasd"));

app.get('/movies/delete/:id', (req, res) => {
    var id = req.params.id;
    if(id >= 0 && id < movies.length){
    movies.splice(id,1);
    res.send({
        status: 200,
        data: movies
    })
    }else{
        res.send({
            status:404, error:true, message:'the movie '+id+ ' does not exist'
        })
    }
})

// sort array of objects , doc on mozilla
app.get('/movies/read/by-date', (req, res)=> res.send({
    status: 200,
    data: movies.sort(function(a, b){
        return (a.year - b.year)
    })
}));

app.get('/movies/read/by-rating', (req, res)=> res.send(
    {
        status:200,
        data: movies.sort(function(a, b){
            return (b.rating - a.rating)
        })
    }
));



app.get('/movies/read/by-title', (req, res)=> res.send(
    {
        status: 200,
        data: movies.sort(function(a, b){
            var x = a.title.toLowerCase();
            var y = b.title.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        })
    }
));

// for later use
// app.get('/movies/get', (req, res)=>{
//     for(let i=0;i<movies.length;i++){
//         res.write(JSON.stringify({status: 200, data: movies[i].title}))
//         res.write("\n")
//     }
//     res.end();
// })


app.listen(port, () => (console.log("app is running")));