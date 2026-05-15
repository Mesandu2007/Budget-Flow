const router = require("express").Router();
const passport = require("passport");
const jwt=require("jsonwebtoken");
const authController=require("../controllers/authController");
const auth = require("../middleware/authMiddleware");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", auth,authController.getProfile);
router.post("/forgot-password",authController.forgotPassword);
router.post("/reset-password/:token",authController.resetPassword);


router.get(
 "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ user: req.user, token });
  }

);
module.exports = router;