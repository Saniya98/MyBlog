const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const bcrypt = require ('bcrypt');
const jwt= require('jsonwebtoken');

const adminLayout = '../views/layouts/admin'
/*
 * GET /
 * Admin - login page
 */
router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      desciption: "This is an admin page",
    };
    res.render('admin/index', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});



/*
 * POST /
 * Admin - check login
 */
// router.post("/admin", async (req, res) => {
//     try {
//      const{username, password}=req.body;
    
//     } catch (error) {
//       console.log(error);
//     }
//   });

  router.post("/admin", async (req, res) => {
    try {
     const{username, password}=req.body;
    if(req.body.username==='admin' && req.body.password==='password'){
      res.send('You are logged in.')
    }else{
      res.send('Wrong Username or password')
    }
    } catch (error) {
      console.log(error);
    }
  });

  


  /*
 * POST /
 * Admin - Register
 */
router.post("/register", async (req, res) => {
  try {
   const{username, password}=req.body;
   const hashedPassword= await bcrypt.hash(password, 10)
   try{
    const user = await User.create({username,password: hashedPassword})
    res.status(201).json({message:'User Created', user})
   }catch(error){
    if(error.code===11000){
      res.status(409).json({message:'user already in use'})
    }
    res.status(500).json({message:'Internal server error'})
   }


  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
