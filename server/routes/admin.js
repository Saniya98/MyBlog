const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get('/admin',async(req,res)=>{
    try{
        const locals={
            title:"admin",
            desciption:"This is an admin page"
        }
        res.render('admin/index', {locals})
    }catch(error){
        console.log("error")
    }
})