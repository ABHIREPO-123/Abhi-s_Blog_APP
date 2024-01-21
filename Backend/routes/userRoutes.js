const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  resetController,
  verifyTokenController,
} = require("../controllers/userContoller");

//router object
const router = express.Router();

// GET ALL USERS || GET
router.get("/all-users", getAllUsers);

// CREATE USER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// Reset Paasword
router.post("/reset", resetController);

// Verify Token
router.get("/verify/:token", verifyTokenController);

module.exports = router;
