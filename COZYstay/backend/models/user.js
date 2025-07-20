const mongoose = require("mongoose");
const userSChema=mongoose.Schema({

    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    isAdmin:{
      type:Boolean,
      default:false
    }

},{
  timestamp:true
})

//to provide Admin Panel Access we have to give 'isAdmin' Property


//1st-collection Name,2nd-Schema Name
const userModal=mongoose.model('users',userSChema);

module.exports=userModal;