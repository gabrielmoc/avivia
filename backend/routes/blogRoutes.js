const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const verificaTokenAdmin = require("../middlewares/verificaTokenAdmin");

// ROTAS DO BLOG
router.post("/api/blog", verificaTokenAdmin, blogController.criarPost);
router.get("/api/blog", blogController.listarPosts);
router.get("/api/blog/:id", blogController.verPost);
router.put("/api/blog/:id", verificaTokenAdmin, blogController.editarPost);
router.delete("/api/blog/:id", verificaTokenAdmin, blogController.deletarPost);

module.exports = router;
