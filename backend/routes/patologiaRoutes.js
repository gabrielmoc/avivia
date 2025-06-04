const express = require("express");
const router = express.Router();
const patologiaController = require("../controllers/patologiaController");
const verificarTokenAdmin = require("../middlewares/verificaTokenAdmin");

router.post("/api/patologias", patologiaController.cadastrarPatologia);
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
  patologiaController.atualizarPatologia
);

module.exports = router;
