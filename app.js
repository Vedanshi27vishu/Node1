const express= require('express');
const { connectToMongoDB }= require("./connect.js");
const urlRoute= require('./routes/url.js');
const { applyTimestamps } = require('./models/url.js');
 
const app= express();
const PORT= 8001;

const noteRoutes = require("./routes/upload.js");

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log("Mongodb connected!"));

app.use(express.json())

app.use("/", urlRoute);

app.use("/", noteRoutes);

// app.get('/:shortId',async(req,res)=>{
//   const shortId= req.params.shortId;
//   await URL.findOneAndUpdate({
//     shortId
//   },{
//     $push:{
//       visitHistory: {
//         timestamp: Date.now(),
//       }
//     },
//   });
//   res.redirect(entry.redirectURL);

// });

app.listen(PORT, ()=>console.log(`Server Started at PORT`));