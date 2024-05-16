const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "MyBlog",
      description: "This is a blog built using node, express,ejs and mongoDB",
    };
    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});
// router.get("/", async (req, res) => {
//   const locals = {
//     title: "MyBlog",
//     description: "This is a blog built using node, express,ejs and mongoDB",
//   };

//   try{
//     const data=await Post.find();
//     res.render("index", { locals, data });

//   }catch(error){
//     console.log(error);
//   }

// });

//Post route
//POST:Id

router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "This is a blog built using node, express,ejs and mongoDB",
    };
    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

//Post route
//POST:SearchTerm

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "This is a blog built using node, express,ejs and mongoDB",
    };
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[a-zA-Z0-9_]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("search",{
      data,
      locals
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Today is a Good Day",
//       body: "Always wake up with Positive thoughts",
//     },
//     {
//       title: "You can Do it!!",
//       body: "It sonly you who can do it...Because you were born to do that!",
//     },
//     {
//       title: "Life is very Beautiful",
//       body: "Life is full for surprises, and we have to enjoy each and every surprise",
//     },
//     {
//       title: "Eat healthy and be happy!",
//       body: "When you eat healthy and tasty food, it directly impacts your mood",
//     },
//     {
//       title: "Happiness is all around",
//       body: "You will find happiness only when you want it, else you will find reason to cry even when you are happy",
//     },
//     {
//       title: "Do not Fear of Failures",
//       body: "No one is perfect in this world, few win in the first go but every does win. Keep Trying!!!",
//     },
//     {
//       title: "Embrace every moment of your life",
//       body: "Life is a journey where you have to feel and enjoy every phase of it, Please do not miss even one phase.",
//     },
//     {
//       title: "Learn to be motivated",
//       body: "Stay motivated and have faith, although you cannot see any path but still have hope that you will do it.",
//     },
//     {
//       title: "If not you then who?",
//       body: "If you are born then you are here to do it, no matter what the situation is but you have to do it",
//     },
//     {
//       title: "You will win!",
//       body: "Keep trying and one day you will definitely reach where you want to be",
//     },
//   ]);
// }
// insertPostData();
