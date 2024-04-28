const express =  require('express');
const app =  express();
const path = require('path');
const methodOverride = require('method-override');
const port = 3000;

const mongoose =  require('mongoose');
const Listing = require('./models/listing.js');
const { title } = require('process');
mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');

app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

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

  // New Route
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});
  // Show Route
  app.get("/listings/:id",async(req,res)=>{
       let {id} = req.params;
       let data = await Listing.findById(id);
 
       res.render("./listings/show.ejs",{data});
  })
 
  //Create Route
  app.post("/listings",async(req,res)=>{
    let newListing= new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
  });

  //Edit Route
  app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id);
    res.render('./listings/edit.ejs',{data})
  })

  //Update Route
  app.put("/listings/:id",async(req,res)=>{
    let {id} =  req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
  }); 
  //Delete Route
  app.delete("/listings/:id",async(req,res)=>{
    let {id} =  req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings')
  })
app.listen(port,()=>{
    console.log("listening on port : "+port)
})

