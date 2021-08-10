const mongoose = require("mongoose");
const employeeScema = new mongoose.Schema({
        firstname:{
           type:String,
           required:true
        },  
        lastname:{
              type:String,
              required:true
        },
        email:{
              type:String,
              required:true,
              unique:true 
        },
        gender:{
             type:String,
             required:true     
        },
        number:{
            type:Number,
            required:true,
            unique:true 
        },
        age:{

            type:Number,
            required:true
        },
        password:{
             type:String,
             required:true 
        },
        comfirmpassword:{
            type:String,
            required:true 
        }
})
      // create cllection 

 const Register = new mongoose.model("Register",employeeScema);
 module.exports = Register;  
