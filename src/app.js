// Imapoting mosules 
const mongoose = require("mongoose");

// connecting with database 
mongoose.connect("mongodb://localhost:27017/sgkumar")
.then(()=>console.log("connecting succesfully..."))
.catch((err)=>console.log("err"));

// defining schema for collections
const studentSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    roll : Number,
    class : String,
    pass : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
});

// creatin of collection with the help of schema 
const Stdinfo = new mongoose.model("Stdinfo",studentSchema);

// create or insert documents 
const createDocument = async()=>{
    try{
        const destail1 = new Stdinfo({
            name :"subham, raj",
            roll : 115,
            class : "cs",
            pass : true
        })
        const destail2 = new Stdinfo({
            name :"raju raj",
            roll : 45,
            class : "sprow",
            pass : true
        })
        const destail3 = new Stdinfo({
            name :"abhsdra",
            roll : 67,
            class : "eNTC",
            pass : false
        })
        
        const result = await Stdinfo.insertMany([destail1,destail2,destail3]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

// calling createDocuments 

// createDocument();


// read documents 
const readDocuments= async()=>{
    try{
        const result = await Stdinfo.find({pass:true}).select({name:1}).limit(1);
        console.log(result);
    }catch(err){
        console.log(err)
    }
}
readDocuments()