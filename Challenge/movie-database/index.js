const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const url = 'mongodb+srv://test_user_1:W8Uj6kDdYA9XNLlL@cluster0-t6agm.mongodb.net/test?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;
mongoose.connect(url,{ useNewUrlParser: true });

const today = new Date(); 
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const articleSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    year: Number
    });
 
const movieCollection = mongoose.model("test_user_1", articleSchema);




const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year:    1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];


app.get('/', (req, res) => res.send('ok'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/test', (req, res) => res.send({status:200, message:"ok"}))

app.get('/time', (req, res) => res.send({status:200, message: time}))

app.get('/hello/:ID?', (req, res) => { 
    if (req.params.ID !== undefined){
    res.send({status:200, message:"Hello, " +req.params.ID})
}else {
    res.send({status:200, message:"Hello" })
}})

app.get('/search', (req, res) => { 
    if (req.query.s !== undefined && req.query.s !== "") {
    res.send({status:200, message:"ok", data:req.query.s})
}else {
    res.send({status:500, error:true, message:"you have to provide a search"})
}})



app.get('/movies/create', (req, res) => {
   const Year = req.query.year;
   const Rating = req.query.rating;
   var ratingB;

   if (Rating !== ""){
    ratingB= Rating
        }else{
    ratingB= 4
    }
    if (req.query.title !== "" && Year.length === 4 && Year !== NaN  ){
        var movie = new movieCollection({title: req.query.title, year: parseInt(Year), rating:parseInt(ratingB)});
        movie.save().then((data)=> {
           // console.log(data);
           res.send({status:200, data: data })
           })
          .catch((err)=> {
            console.log(err);
            res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
          })
       

        
    }})

app.get('/movies/read', (req, res) => {
    var User= movieCollection;
    User.find({})
    .then((data)=>{
        res.send({status:200, data: data })
    })
    .catch((err)=>{
    console.log(err);
    })})

app.get('/movies/read/by-date', (req, res) => {
    var User= movieCollection;
    User.find({}).sort({year:1})
    .then((data)=>{
        res.send({status:200, data: data })
     })
    .catch((err)=>{
      console.log(err);
    })})


app.get('/movies/read/by-rating', (req, res) => {
    var User= movieCollection;
    User.find({}).sort({rating:-1})
    .then((data)=>{
        res.send({status:200, data: data })
     })
    .catch((err)=>{
      console.log(err);
    })})



// res.send({status:200, data: movies.sort((a, b) => (b.rating - a.rating))}))

app.get('/movies/read/by-title', (req, res) => {
    var User= movieCollection;
    User.find({}).sort({title:1})
    .then((data)=>{
        res.send({status:200, data: data })
     })
    .catch((err)=>{
      console.log(err);
    })
})


app.get('/movies/read/id/:ID?', (req, res) => {
    
    var User= movieCollection;
    User.findById(req.params.ID)
    .then((data)=>{
        res.send({status:200, data: data })
    })
    .catch((err)=>{ 
    console.log(err);
    })
    
})
    
app.get('/movies/update/:ID?', (req, res) => {
    var User = movieCollection;
    if (mongoose.Types.ObjectId.isValid(req.params.ID)){
    if(mongoose.Types.ObjectId.isValid(req.params.ID) && req.query.title) {
        User.findByIdAndUpdate(req.params.ID,{$set:{title:req.query.title}},{multi:true, new:true})       
        .then((docs)=>{
           if(docs) {
             
            //resolve({success:true,data:docs});
           } else {
             reject({success:false,data:"no such user exist"});
           }
        }).catch((err)=>{
            reject(err);
        })
        }
        if(mongoose.Types.ObjectId.isValid(req.params.ID) && req.query.year) {
            User.findByIdAndUpdate(req.params.ID,{$set:{year:req.query.year}},{multi:true, new:true})       
            .then((data)=>{
               if(data) {
                 
                //resolve({success:true,data:docs});
               } else {
                 reject({success:false,data:"no such user exist"});
               }
            }).catch((err)=>{
                reject(err);
            })}
            if(mongoose.Types.ObjectId.isValid(req.params.ID) && req.query.rating) {
                User.findByIdAndUpdate(req.params.ID,{$set:{rating:req.query.rating}},{multi:true, new:true})       
                .then((data)=>{
                   if(data) {
                     
                   // resolve({success:true,data:docs});
                   } else {
                     reject({success:false,data:"no such user exist"});
                   }
                }).catch((err)=>{
                    reject(err);
                })} 
                if (mongoose.Types.ObjectId.isValid(req.params.ID)){
                    var User= movieCollection;
                User.find({})
                .then((data)=>{
                    res.send({status:200, data: data })
                })
                .catch((err)=>{
                console.log(err);
                })}
                // else {
        //   reject({success:"false",data:"provide correct key"});
        // }
        

}
else{
    res.send({status:404, error:true, message:'the movie <ID> does not exist'})
}})

app.get('/movies/delete/:ID?', (req, res) => {
    var User = movieCollection;
    if(mongoose.Types.ObjectId.isValid(req.params.ID)) {
        User.findOneAndRemove({_id: req.params.ID})
          .then((docs)=>{
             if(docs) {
                resolve({"success":true,data:docs});
             } else {
                reject({"success":false,data:"no such user exist"});
             }
        }).catch((err)=>{
            reject(err);
        })
      } else {
          reject({"success":false,data:"please provide correct Id"});
      }
    
})
