// Imapoting mosules 
const mongoose = require("mongoose");
const validator = require("validator")

// connecting with database 
mongoose.connect("mongodb://localhost:27017/sgkumar")
.then(()=>console.log("connecting succesfully..."))
.catch((err)=>console.log("err"));

// defining schema for collections
const studentSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true,
        trim : true,
        minlength:2,
        maxlength:30
    },
    roll : {
        type:Number,
        unique:true,
        validate(value){
            if(value < 0)
            throw new Error("roll should not be -ve")
        }
    },
    class :{
        type:String,
        uppercase:true,
        enum: ["ENTC","IT","CSE"]
    },
    email :{
        type : String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid")
            }
        }
    },
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
            name :"      vikaru  ",
            roll : 112,
            class : "cse",
            email: "hdfjhjs@ghkk.m",
            pass : false
        })
        // const destail2 = new Stdinfo({
        //     name :"raju raj",
        //     roll : 45,
        //     class : "sprow",
        //     pass : true
        // })
        // const destail3 = new Stdinfo({
        //     name :"abhsdra",
        //     roll : 67,
        //     class : "eNTC",
        //     pass : false
        // })
        
        const result = await Stdinfo.insertMany(destail1);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

// calling createDocuments 
createDocument();


/*
// read documents 
const readDocuments= async()=>{
    try{
        const result = await Stdinfo
        .find({pass:true})
        .select({name:1})
        .limit(1);
        console.log(result);
    }catch(err){
        console.log(err)
    }
}*/


/*
//  coparision operator  in mongooese
const readDocuments= async()=>{
    try{
        const result = await Stdinfo
        // .find({roll:{$gt:100}})   // (Qn) find that students whose roll is above the 100 
        // .find({roll:{$lte:74}})   // (Qn) find that students whose roll is below the 74 
        // .find({class:{$in:["ENTC","IT","sprow"]}})   // (Qn) find that students who is in ENTC and IT
        .find({class:{$nin:["ENTC","IT","sprow"]}})   // (Qn) find that students who is in ENTC and IT
        .select({name:1,_id:0});
        console.log(result);
    }catch(err){
        console.log(err)
    }
}
*/

/*
// logical operator in mongoose 
const readDocuments= async()=>{
    try{
        const result = await Stdinfo
        // .find({$or :[{roll:45},{class:"ENTC"}]})   //or operator
        // .find({$and :[{roll:121},{class:"ENTC"}]})   //and operator
        .find({$nor :[{roll:121},{class:"ENTC"}]})   //and operator
        .select({name:1,_id:0});
        console.log(result);
    }catch(err){
        console.log(err)
    }
}
*/


// count using mongoose 
const readDocuments= async()=>{
    try{
        const result = await Stdinfo
        .find({pass : true})   //find student who is pass in exam
        .select({name:1,_id:0})
        // .countDocuments() //count documents
        .sort({name:-1})
        console.log(result);
    }catch(err){
        console.log(err)
    }
}

// calling readDocuments function 
// readDocuments() 

// update Documents 
const updateDocuments = async()=>{
    try{
        const result = await Stdinfo.updateOne({roll:120},{
            $set:{
                name:"mukhiya"
            }
        })
        console.log(result)
    }catch(err){
        console.log(err)
    }
}
// updateDocuments()


// delete the documents 
const deleteDocuments = async()=>{
    try{
        const result = await Stdinfo.deleteMany({pass:false})
        console.log(result)
    }catch(err){
        console.log(err)
    }
}
// deleteDocuments() 
