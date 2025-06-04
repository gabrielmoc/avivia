const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");

router.post("/admin/login", loginAdmin);

module.exports = router;
