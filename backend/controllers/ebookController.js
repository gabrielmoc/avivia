const pool = require("../db");

// CADASTRAR EBOOK
exports.cadastrarEbook = async (req, res) => {
  let { titulo, descricao, link_pdf, data_publicacao, imagem_url } = req.body;

  if (req.file) {
    imagem_url = `/uploads/${req.file.filename}`;
  }

  try {
    await pool.query(
      "INSERT INTO ebooks (titulo, descricao, link_pdf, data_publicacao, imagem_url) VALUES ($1, $2, $3, $4, $5)",
      [titulo, descricao, link_pdf, data_publicacao, imagem_url]
    );
    res.status(201).json({ mensagem: "E-book cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar e-book:", erro);
    res.status(500).json({ erro: "Erro no servidor ao cadastrar e-book." });
  }
};

// LISTAR TODOS OS EBOOKS
exports.listarEbooks = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM ebooks ORDER BY data_publicacao DESC"
    );
    res.status(200).json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao listar e-books:", erro);
    res.status(500).json({ erro: "Erro no servidor ao listar e-books." });
  }
};

// DELETAR EBOOK POR ID
exports.deletarEbook = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM ebooks WHERE id = $1", [id]);
    res.status(200).json({ mensagem: "E-book deletado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao deletar e-book:", erro);
    res.status(500).json({ erro: "Erro no servidor ao deletar e-book." });
  }
};

// ATUALIZAR EBOOK
exports.atualizarEbook = async (req, res) => {
  const { id } = req.params;
  let { titulo, descricao, link_pdf, data_publicacao, imagem_url } = req.body;

  if (req.file) {
    imagem_url = `/uploads/${req.file.filename}`;
  }

  try {
    const resultado = await pool.query(
      `UPDATE ebooks 
       SET titulo = $1, descricao = $2, link_pdf = $3, data_publicacao = $4, imagem_url = $5
       WHERE id = $6`,
      [titulo, descricao, link_pdf, data_publicacao, imagem_url, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: "E-book não encontrado." });
    }

    res.status(200).json({ mensagem: "E-book atualizado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao atualizar e-book:", erro);
    res.status(500).json({ erro: "Erro no servidor ao atualizar e-book." });
  }
};
