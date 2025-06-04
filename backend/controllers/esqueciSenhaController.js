const pool = require("../db");

const registrarPedidoRecuperacao = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ mensagem: "E-mail obrigatório" });
  }

  try {
    await pool.query(
      "INSERT INTO pedidos_recuperacao (email) VALUES ($1)",
      [email]
    );

    return res.status(200).json({ mensagem: "Solicitação registrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar pedido:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

module.exports = { registrarPedidoRecuperacao };
