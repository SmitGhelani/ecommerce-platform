import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(()=>{
    console.log("Connection Established Successfully!!!")
})
.catch((e)=>{
    console.log("Connection Failed!!!")
})