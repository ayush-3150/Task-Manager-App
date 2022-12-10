const express=require('express');

const PORT=process.env.PORT || 5000
const app=express();

//route
app.get("/",(req,res)=>{
    res.send("<h2> home page</h2>")
})
app.listen(PORT,(req,res)=>{
    console.log(`Sever running on PORT no ${PORT}`);
})