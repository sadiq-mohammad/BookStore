import express from "express"
const router=express.Router();
import {Book} from '../models/bookModel.js'

router.post('/',async(req,res)=>{
    try{
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({message:'fill all fields:title, author, publishyear'})
        }
        const book =await Book.create({
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        })
        res.status(201).send({message:'book successfully created'})
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})
router.get('/', async(req,res)=>{
    try{
        const books=await Book.find({});
        res.status(200).json({ count: books.length, data:books})

    }catch(error){
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})
router.get('/:id', async(req,res)=>{
    try{
        const books=await Book.findById(req.params.id);
        return res.status(200).json(books)
    }catch(error){
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})
router.put("/:id", async(req,res)=>{
    try{
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({message:'fill all fields:title, author, publishyear'})
        }
        const books=await Book.findByIdAndUpdate(req.params.id, req.body)
        if(!books){
            res.status(404).json({message:'Book Not Found'})
        }
        return res.status(200).send({message:"Book Updated successfully"})
    }catch(error){
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})
router.delete('/:id', async(req,res)=>{
    try{
        const book =await Book.findByIdAndDelete(req.params.id)
        if(!book){
            res.status(404).json({message:'Book Not Found'})
        }
        return res.status(200).json({message:'Book Deleted successfully'})
    }catch(error){
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})


export default router;