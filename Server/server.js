const express=require('express')
const mongoose=require('mongoose')
const env=require('dotenv')
const cors=require('cors')
const cookieParse=require('cookie-parser');
const userRoute=require('./Routes/UserRoutes')
const adminRoute=require('./Routes/AdminRoutes')
const path=require('path')

env.config();
const port=process.env.port
const app=express()
app.use(cors());
app.use(cookieParse());
app.use(express.json());
app.use('/uploads',express.static('uploads'))
app.use(express.urlencoded({extended:true}));

app.use('/',userRoute)
app.use('/admin',adminRoute)
mongoose.connect(process.env.Mongo_URL, {});

app.listen(port, () => { 
  console.log("Server is Running");
});
