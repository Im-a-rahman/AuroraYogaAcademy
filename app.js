const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const pug = require('pug');


const app = express();
const port = 8000;

mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://localhost:27017/YogaAcademy');

//SCHEMA
const contactSchema = new mongoose.Schema({
    name: {
        type:String,
        required : true
    },
    age: String,
    gender: String,
    phone: String,
    email: String
  });

const contact = mongoose.model('contact',contactSchema);



//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(bodyparser.urlencoded({extended:false})) 
//it helps to bring form data of post request to express

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

// end pointS
app.get('/',(req,res)=>{

    res.status(200).render('home.pug')
})
app.get('/contact',(req,res)=>{

    res.status(200).render('contact.pug')
})
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body)
    myData.save().then( ()=>{
        res.send("This data has been saved in database")
    }).catch(()=>{
        res.status(400).send("Form not submitted")
    })
})
app.get('/about',(req,res)=>{

    res.status(200).render('about.pug')
})
app.get('/services',(req,res)=>{

    res.status(200).render('services.pug')
})
app.get('/info',(req,res)=>{

    res.status(200).render('classinfo.pug')
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
})