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
  try {
    const blogData = await Blog.findAll({
      attributes: ["id", "title", "description"],
      include: [
        {
          model: User,
          attributes: ["first_name", "user_name"],
        },
      ],
    });

    const user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    console.log(user);

    const dbBlog = blogData
      .map((userpost) => userpost.get({ plain: true }))
      .map((post) => {
        return {
          ...post,
          isOwned: req.session.user_id === post.user_id,
        };
      });

    console.log(dbBlog);
    res.render("blogs", {
      dbBlog,
      user: user.get({ plain: true }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // try {
  //     res.render("dashboard", { posts: [{
  //         id: 1,
  //         user_id: 1,
  //         post: 'Example'
  //     }]});
  // } catch (error) {
  //     res.json(error);
  // }
});

module.exports = router;
