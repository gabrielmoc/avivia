// backend/routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const verificaTokenAdmin = require("../middlewares/verificaTokenAdmin");

router.post(
  "/api/feedback",
  verificaTokenAdmin,
  feedbackController.criarFeedback
);
router.get("/api/feedback", feedbackController.listarFeedbacks);
router.put(
  "/api/feedback/:id",
  verificaTokenAdmin,
  feedbackController.atualizarFeedback
);
router.delete(
  "/api/feedback/:id",
  verificaTokenAdmin,
  feedbackController.deletarFeedback
);

module.exports = router;
