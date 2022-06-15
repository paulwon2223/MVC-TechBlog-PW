const router = require("express").Router();
const { User } = require("../../models");

// creates new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      first_name: req.body.fname,
      last_name: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      user_name: req.body.username,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id || null;
      res.status(201).json(dbUserData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// login
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(dbUserData);
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Unable to locate your login information." });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Unable to locate your login information." });
      return;
    }

    req.session.save(() => {
      console.log("asdf");
      req.session.user_id = dbUserData.id || null;
      req.session.loggedIn = true;
      res.status(200).json({
        user: dbUserData,
        message: `${dbUserData.user_name} is now logged in!`,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
