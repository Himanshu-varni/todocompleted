const mongoose=require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/LoginFormPractice")
.then(()=>{
    console.log("mongodb connected");
})              
.catch(()=>{
    console.log("failed to connect")
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const todoSchema = new mongoose.Schema({
      task: String,
      dueDate: Date,
      completed: Boolean
      /* required: true, */
    
    /* datepicker: {
        type: String,
        required: true,
      }, */
      /* status:{
        type: String,
        required: true,
      },
      completed: Boolean */
  });

const collection=new mongoose.model("Collection1",LogInSchema)
const Todo=new mongoose.model("Todo",todoSchema)


module.exports={collection,Todo}