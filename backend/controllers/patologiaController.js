const pool = require("../db");

// Cadastrar patologia
exports.cadastrarPatologia = async (req, res) => {
  const { nome, descricao, imagem_url } = req.body;
  try {
    await pool.query(
      "INSERT INTO patologias (nome, descricao, imagem_url) VALUES ($1, $2, $3)",
      [nome, descricao, imagem_url]
    );
    res.status(201).json({ mensagem: "Patologia cadastrada com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar patologia." });
  }
};

// Listar patologias
exports.listarPatologias = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT id, nome, descricao, imagem_url FROM patologias"
    );
    res.status(200).json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao listar patologias." });
  }
};

exports.buscarPatologiaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "SELECT * FROM patologias WHERE id = $1",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: "Patologia não encontrada." });
    }

    res.status(200).json(resultado.rows[0]); // <-- retorno direto do objeto
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao buscar patologia." });
  }
};

// Deletar patologia
exports.deletarPatologia = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query("DELETE FROM patologias WHERE id = $1", [
      id,
    ]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: "Patologia não encontrada." });
    }

    res.status(200).json({ mensagem: "Patologia deletada com sucesso." });
  } catch (erro) {
    console.error("Erro ao deletar patologia:", erro);
    res.status(500).json({ mensagem: "Erro ao deletar patologia." });
  }
};

// Atualizar patologia
exports.atualizarPatologia = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, imagem_url } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE patologias SET nome = $1, descricao = $2, imagem_url = $3 WHERE id = $4 RETURNING *",
      [nome, descricao, imagem_url, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: "Patologia não encontrada." });
    }

    res.status(200).json({ mensagem: "Patologia atualizada com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro ao atualizar patologia." });
  }
};
