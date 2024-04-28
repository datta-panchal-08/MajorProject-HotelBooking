const express =  require('express');
const app =  express();
const path = require('path');
const port = 3000;

const mongoose =  require('mongoose');
const Listing = require('./models/listing.js');
mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');

app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));

app.get("/",(req,res)=>{
    res.send("Welcome")
})


// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title : "My Villa",
//         description : "On The Mountains",
//         country : "India",
//         location  :"Himalaya",
//         price : 1200
//     });
//     await sampleListing.save();
//     console.log("Sample Was Saved!");
//     res.send("Successfull Testing!");
// })


// Index Route  
   app.get("/listings",async(req,res)=>{
    let allListings = await Listing.find({});
    res.render('./listings/index.ejs',{allListings});
  });
  
  app.get("/listings/:id",async(req,res)=>{
       let {id} = req.params;
       let data = await Listing.findById(id);
       
       res.render("show.ejs",{data});

       
  })

app.listen(port,()=>{
    console.log("listening on port : "+port)
})

