const express = require("express");
const router = express.Router();
const ebookController = require("../controllers/ebookController");
const verificarTokenAdmin = require("../middlewares/verificaTokenAdmin");
const upload = require("../uploadConfig"); // ✅ Adicionado

// Rotas de e-books
router.post(
  "/api/ebooks",
  verificarTokenAdmin,
  upload.single("imagem"), // ✅ Adicionado
  ebookController.cadastrarEbook
);

router.get("/api/ebooks", ebookController.listarEbooks);

router.put(
  "/api/ebooks/:id",
  verificarTokenAdmin,
  upload.single("imagem"), // ✅ Adicionado
  ebookController.atualizarEbook
);

router.delete(
  "/api/ebooks/:id",
  verificarTokenAdmin,
  ebookController.deletarEbook
);

module.exports = router;
