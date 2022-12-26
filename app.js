const express = require('express')
const path=require("path")
const app=express();
const bodyparser = require ("body-parser");
const mongoose=require ('mongoose');
mongoose.connect('mongodb://localhost/contactDance');


const port=8000;

app.use(express.urlencoded()) //help to  get( in EXPRESS) the data in console

//// EXPRESS SPECIFIC STUFF

app.use("/static",express.static("static")) //// For SEeVING STATIC FILES



////PUG SPECIFIC STUFF

app.set("view engine","pug")  ////Set the TAMPLATE ENGINE as PUG
app.set("views",path.join(__dirname,"views"))  ////Set the VIEW 


//// Define Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,  //// This is which you want to store in mongo db 
    

  });

  const Contact = mongoose.model('Contact', contactSchema);



////ENDPOINTS

app.get("/",(req,res)=>{
    const params={"title":"GYM","content":"Best GYM" }
    res.status(200).render("home.pug",params)
})

app.get("/contact",(req,res)=>{
    const params={"title":"GYM","content":"Best GYM" }
    res.status(200).render("contact.pug",params)
})

app.post("/contact",(req,res)=>{  // for saving the data by post request
    var myData= new Contact (req.body);
    myData.save().then(()=>{   // .then used because this is a promise
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    res.status(200).render("contact.pug")
})







//// START THE SERVER


app.listen(port,()=>{
    console.log(`The application run on port${port}`)
});
 

