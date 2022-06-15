const router = require("express").Router();

const userRoutes = require("./userRoute");
const blogRoutes = require("./blogRoute");

router.use("/users", userRoutes);
router.use("/dashboard", blogRoutes);


module.exports = router;