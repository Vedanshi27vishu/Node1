const mongoose= require('mongoose');

const urlSchema= new mongoose.Schema({
  shortID:{
    type:String,
    required:true,
    unique:true
  },
  redirectURL:{
    type:String,
    required:true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USERS"
  },
  visitHistory:[{timestamp: {type:Number}}],
},
 {timestamps: true}
);

const URL= mongoose.model('URL', urlSchema);
module.exports= URL;
