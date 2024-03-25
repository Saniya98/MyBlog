const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
const locals={
    title: "MyBlog",
    description: "This is a blog built using node, express,ejs and mongoDB"
}




    res.render('index', {locals});
});

router.get('/about',(req,res)=>{
res.render('about')
})

router.get('/contact',(req,res)=>{
    res.render('contact')
})

module.exports=router;