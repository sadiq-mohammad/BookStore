import express from 'express';
import {PORT, mongoDB_URI} from './config.js'
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app=express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin:'http://localhost:7000',
//     methods:['GET', 'POST','PUT', 'DELETE'],
//     allowedHeaders:['Content-Type']
// }))

app.get("/", (req,res)=>{
    console.log(req)
    return res.send("Welcome to my page")
})

app.use('/books', booksRoute)


mongoose.connect(mongoDB_URI)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })
    console.log('MongoDB database connected')
})
.catch((error)=>{
    console.log(error);
})
