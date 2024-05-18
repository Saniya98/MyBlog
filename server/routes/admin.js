const express = require("express");
const router = express.Router();
const Post = require("../models/post");
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

module.exports = router;
