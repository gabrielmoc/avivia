const express = require("express");
const router = express.Router();
const { registrarPedidoRecuperacao } = require("../controllers/esqueciSenhaController");

router.post("/esqueci-senha", registrarPedidoRecuperacao);

module.exports = router;
