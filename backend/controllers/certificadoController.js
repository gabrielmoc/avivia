const pool = require("../db");

// CADASTRAR CERTIFICADO
exports.cadastrarCertificado = async (req, res) => {
  const { titulo, link_pdf, descricao, lote } = req.body;

  try {
    await pool.query(
      "INSERT INTO certificados (titulo, link_pdf, descricao, lote) VALUES ($1, $2, $3, $4)",
      [titulo, link_pdf, descricao, lote]
    );
    res.status(201).json({ mensagem: "Certificado cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar certificado:", erro);
    res
      .status(500)
      .json({ erro: "Erro no servidor ao cadastrar certificado." });
  }
};

// LISTAR CERTIFICADOS
exports.listarCertificados = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM certificados ORDER BY id DESC"
    );
    res.status(200).json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao listar certificados:", erro);
    res.status(500).json({ erro: "Erro ao listar certificados." });
  }
};

// DELETAR CERTIFICADO
exports.deletarCertificado = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM certificados WHERE id = $1", [id]);
    res.status(200).json({ mensagem: "Certificado deletado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao deletar certificado:", erro);
    res.status(500).json({ erro: "Erro ao deletar certificado." });
  }
};

// FILTRO DE BUSCA
exports.buscarPorLote = async (req, res) => {
  const { lote } = req.query;

  try {
    const resultado = await pool.query(
      "SELECT * FROM certificados WHERE lote ILIKE $1",
      [`%${lote}%`]
    );
    res.status(200).json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao buscar certificado por lote:", erro);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

// ATUALIZAR CERTIFICADO
exports.atualizarCertificado = async (req, res) => {
  const { id } = req.params;
  const { titulo, link_pdf, descricao, lote } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE certificados SET titulo = $1, link_pdf = $2, descricao = $3, lote = $4 WHERE id = $5 RETURNING *",
      [titulo, link_pdf, descricao, lote, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: "Certificado não encontrado." });
    }

    res.status(200).json({ mensagem: "Certificado atualizado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao atualizar certificado:", erro);
    res.status(500).json({ erro: "Erro ao atualizar certificado." });
  }
};
