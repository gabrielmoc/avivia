const express = require("express");
const router = express.Router();
const certificadoController = require("../controllers/certificadoController");
const verificaTokenAdmin = require("../middlewares/verificaTokenAdmin");

router.post(
  "/api/certificados",
  verificaTokenAdmin,
  certificadoController.cadastrarCertificado
);
router.get("/api/certificados", certificadoController.listarCertificados);
router.delete(
  "/api/certificados/:id",
  verificaTokenAdmin,
  certificadoController.deletarCertificado
);
router.put(
  "/api/certificados/:id",
  verificaTokenAdmin,
  certificadoController.atualizarCertificado
);

router.get("/certificados/busca", certificadoController.buscarPorLote);

module.exports = router;
