const express = require("express");
const router = express.Router();
const estudoController = require("../controllers/estudoController");
const verificaTokenAdmin = require("../middlewares/verificaTokenAdmin");

router.post("/api/estudos", verificaTokenAdmin, estudoController.criarEstudo);
router.get("/api/estudos", estudoController.listarEstudos);
router.get("/api/estudos/patologia/:id", estudoController.listarPorPatologia);
router.delete(
  "/api/estudos/:id",
  verificaTokenAdmin,
  estudoController.deletarEstudo
);
router.put(
  "/api/estudos/:id",
  verificaTokenAdmin,
  estudoController.atualizarEstudo
);

module.exports = router;
