const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/autenticacao");
const {
  cadastrarPrescritor,
  loginPrescritor,
  perfilPrescritor,
  atualizarPerfil,
} = require("../controllers/prescritorController");

router.post("/api/cadastro", cadastrarPrescritor);
router.post("/login", loginPrescritor);
router.get("/perfil", verificarToken, perfilPrescritor);
router.put("/perfil", verificarToken, atualizarPerfil);

module.exports = router;
