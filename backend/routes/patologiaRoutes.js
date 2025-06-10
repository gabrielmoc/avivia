const express = require("express");
const router = express.Router();
const patologiaController = require("../controllers/patologiaController");
const verificarTokenAdmin = require("../middlewares/verificaTokenAdmin");
const upload = require("../uploadConfig"); // <-- Adicionado

router.post(
  "/api/patologias",
  verificarTokenAdmin, // Protegemos a rota POST também (seguindo padrão do admin)
  upload.single("imagem"), // <-- Adicionado
  patologiaController.cadastrarPatologia
);

router.get("/api/patologias", patologiaController.listarPatologias);

router.get("/api/patologias/:id", patologiaController.buscarPatologiaPorId);

router.delete(
  "/api/patologias/:id",
  verificarTokenAdmin,
  patologiaController.deletarPatologia
);

router.put(
  "/api/patologias/:id",
  verificarTokenAdmin,
  upload.single("imagem"), // <-- Adicionado na PUT também
  patologiaController.atualizarPatologia
);

module.exports = router;
