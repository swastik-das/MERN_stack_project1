const { static } = require("express");
const express = require("express");
const app = express();
const path =require("path"); 
const hbs= require("hbs");
require("./db/conn");
const Regiter=require("./models/registers");
const { error } = require("console");


const port = process.env.PORT || 3000; 

const static_path =path.join(__dirname,"../public"); //public path 
const templates_path =path.join(__dirname,"../templates/views");//views path 
const partial_path =path.join(__dirname,"../templates/partials"); // partial path 

app.use(express.static(static_path)); // for public static 
app.use(express.json());
app.use(express.urlencoded({extended:false})); // don't ingnore the html input

app.set("view engine","hbs") //  view to hbs 
app.set("views",templates_path); // view to templates
hbs.registerPartials(partial_path)  // partial 

app.get("/",(req,res)=>{
   res.render("index")   
});

 app.get("/index",(req,res)=>{
  res.render("index")   
 });

app.get("/register",(req,res)=>{
    res.render("register")
  });
app.get("/login",(req,res)=>{
  res.render("login");
});

// save data from Mongo DB
app.post("/register",async(req,res)=>{
   try{
   const password =req.body.password;
   const cpassword =req.body.comfirmpassword;
    if(password === cpassword){

     const registerEmployes = new Regiter({ 
          firstname:req.body.firstname,
           lastname: req.body.lastname,
           email:req.body.email,
           gender:req.body.gender,
           number:req.body.number,
           age:req.body.age,
           password:password,
           comfirmpassword:cpassword
     });

     const registred = await registerEmployes.save();
     res.status(201).render("index");   

    } else{
      res.send("password not match");
        }

   } catch(error){
    res.status(400).send("Somthing Gonna Be Error");
        }
           });   
       // Login verificatrion 
    app.post("/login",async(req,res)=>{
    try{
     const email= req.body.Email;
     const password = req.body.password;   
     const useremail= await Regiter.findOne({email:email});
     if(useremail.password === password){
  res.status(201).render("index");
     } else{
       res.send("Please Enter proper email and password")
    }
    }catch(err){
    console.log("somthing gonna be wrong");
          }
     });

  app.listen(port,()=>{
  console.log(`listining  from the port ${port}`);
  });