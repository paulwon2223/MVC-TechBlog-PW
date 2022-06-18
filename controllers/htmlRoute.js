const router = require("express").Router();
// const withAuth = require("../utils/auth");
const { Blog, User } = require("../models");

// gets the homepage handelbar
router.get("/", async (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    res.json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.json(err);
  }
});

router.get("/blogs", async (req, res) => {
  const blogData = await Blog.findAll({
    
  })
  console.log(blogData);

  const dbBlog = blogData
  .map((userpost) => userpost.get({ plain: true }))
  .map((post) => {
    return {
      ...post
    };
  });
  try{
    res.render("blogs", {dbBlog});
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
