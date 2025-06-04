const express = require("express");
const router = express.Router();
const ebookController = require("../controllers/ebookController");
const verificarTokenAdmin = require("../middlewares/verificaTokenAdmin");

// Rotas de e-books
router.post("/api/ebooks", verificarTokenAdmin, ebookController.cadastrarEbook);
router.get("/api/ebooks", ebookController.listarEbooks);
router.put(
  "/api/ebooks/:id",
  verificarTokenAdmin,
  ebookController.atualizarEbook
);
router.delete(
  "/api/ebooks/:id",
  verificarTokenAdmin,
  ebookController.deletarEbook
);

module.exports = router;
