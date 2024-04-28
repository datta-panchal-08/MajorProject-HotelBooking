const express =  require('express');
const app =  express();
const port = 3000;
const mongoose =  require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');



app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.listen(port,()=>{
    console.log("listening on port : "+port)
})

