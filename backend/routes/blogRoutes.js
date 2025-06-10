const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const verificaTokenAdmin = require("../middlewares/verificaTokenAdmin");
const upload = require("../uploadConfig");

// ROTAS DO BLOG
router.post(
  "/api/blog",
  verificaTokenAdmin,
  upload.single("imagem"),
  blogController.criarPost
);
router.get("/api/blog", blogController.listarPosts);
router.get("/api/blog/:id", blogController.verPost);
router.put(
  "/api/blog/:id",
  verificaTokenAdmin,
  upload.single("imagem"),
  blogController.editarPost
);
router.delete("/api/blog/:id", verificaTokenAdmin, blogController.deletarPost);

module.exports = router;
