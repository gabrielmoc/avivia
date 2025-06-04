// backend/controllers/feedbackController.js
const pool = require("../db");

// POST /api/feedback
exports.criarFeedback = async (req, res) => {
  const { nome, texto, estrelas } = req.body;
  await pool.query(
    "INSERT INTO feedbacks (nome, texto, estrelas) VALUES ($1,$2,$3)",
    [nome, texto, estrelas]
  );
  res.status(201).json({ msg: "Feedback criado" });
};

// GET /api/feedback   (?limite=3 opcional)
exports.listarFeedbacks = async (req, res) => {
  const { limite } = req.query;
  const q = limite
    ? "SELECT * FROM feedbacks ORDER BY id DESC LIMIT $1"
    : "SELECT * FROM feedbacks ORDER BY id DESC";
  const { rows } = await pool.query(q, limite ? [Number(limite)] : []);
  res.json({ feedbacks: rows });
};

// PUT /api/feedback/:id
exports.atualizarFeedback = async (req, res) => {
  const { nome, texto, estrelas } = req.body;
  await pool.query(
    "UPDATE feedbacks SET nome=$1, texto=$2, estrelas=$3 WHERE id=$4",
    [nome, texto, estrelas, req.params.id]
  );
  res.json({ msg: "Feedback atualizado" });
};

// DELETE /api/feedback/:id
exports.deletarFeedback = async (req, res) => {
  await pool.query("DELETE FROM feedbacks WHERE id=$1", [req.params.id]);
  res.json({ msg: "Feedback excluído" });
};
