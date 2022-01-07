// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const router = express.Router();
const AuthCtrl = require("./auth-ctrl");

// =======================================
//              GET ROUTES
// =======================================
// This is for logout
router.get("/logout", AuthCtrl.logout);

// =======================================
//              POST ROUTES
// =======================================
// This is for creating new account
router.post("/signup", AuthCtrl.createUser);
// This is for authenticating a current user
router.post("/login", AuthCtrl.loginUser);

// =======================================
//              DELETE ROUTES
// =======================================
// delete user
// :id is the user's id
router.delete("/users/:id", AuthCtrl.deleteUser);

module.exports = router;