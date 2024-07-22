const bodyParser = require("body-parser");
const express = require("express");
const cors=require("cors");
const port =3000;
const mainRouter=require('./routes/index');
const app=express();


app.use(cors({
    origin:"*",
}));
app.use(express.json());

app.use('/api/v1',mainRouter)


app.listen(port,()=>{
    console.log("Running on port 3000");
})


