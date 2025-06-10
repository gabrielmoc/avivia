const pool = require("../db");

// Cadastrar
exports.criarEstudo = async (req, res) => {
  let { titulo, link_estudo, patologia_id, descricao, imagem_url } = req.body;

  // Se foi feito upload de imagem, substitui o imagem_url
  if (req.file) {
    imagem_url = `/uploads/${req.file.filename}`;
  }

  try {
    await pool.query(
      `INSERT INTO estudos_cientificos (titulo, link_estudo, patologia_id, descricao, imagem_url)
       VALUES ($1, $2, $3, $4, $5)`,
      [titulo, link_estudo, patologia_id, descricao, imagem_url]
    );

    res
      .status(201)
      .json({ mensagem: "Estudo científico cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar estudo:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar estudo." });
  }
};

// Listar todos
exports.listarEstudos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.id, e.titulo, e.link_estudo, e.descricao, e.imagem_url, p.nome AS patologia
      FROM estudos_cientificos e
      JOIN patologias p ON e.patologia_id = p.id
    `);
    res.status(200).json(result.rows);
  } catch (erro) {
    console.error("Erro ao listar estudos:", erro);
    res.status(500).json({ erro: "Erro ao listar estudos científicos." });
  }
};

// Listar estudos por patologia
exports.listarPorPatologia = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT id, titulo, link_estudo, descricao, imagem_url
      FROM estudos_cientificos
      WHERE patologia_id = $1
    `,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (erro) {
    console.error("Erro ao buscar estudos por patologia:", erro);
    res.status(500).json({ erro: "Erro ao buscar estudos por patologia." });
  }
};

// Deletar
exports.deletarEstudo = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      "DELETE FROM estudos_cientificos WHERE id = $1",
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: "Estudo não encontrado." });
    }

    res.status(200).json({ mensagem: "Estudo deletado com sucesso." });
  } catch (erro) {
    console.error("Erro ao deletar estudo:", erro);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

// Atualizar estudo
exports.atualizarEstudo = async (req, res) => {
  const { id } = req.params;
  let { titulo, link_estudo, patologia_id, descricao, imagem_url } = req.body;

  // Se foi feito upload de imagem, substitui o imagem_url
  if (req.file) {
    imagem_url = `/uploads/${req.file.filename}`;
  }

  try {
    const resultado = await pool.query(
      `UPDATE estudos_cientificos 
       SET titulo = $1, link_estudo = $2, patologia_id = $3, descricao = $4, imagem_url = $5
       WHERE id = $6 RETURNING *`,
      [titulo, link_estudo, patologia_id, descricao, imagem_url, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: "Estudo não encontrado." });
    }

    res.status(200).json({ mensagem: "Estudo atualizado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao atualizar estudo:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar estudo." });
  }
};
