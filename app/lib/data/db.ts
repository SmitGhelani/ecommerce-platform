import mongoose from "mongoose";

mongoose.connect("mongodb+srv://smit:UN2mesmngr4KrS9O@handson-clust.f6cijrz.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connection Established Successfully!!!")
})
.catch((e)=>{
    console.log("Connection Failed!!!")
})