const pool = require("../db");

// Criar novo post (Admin)
exports.criarPost = async (req, res) => {
  const { titulo, conteudo, imagem_url } = req.body;

  try {
    const query = `
      INSERT INTO posts_blog (titulo, conteudo, imagem_url, data_publicacao)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [titulo, conteudo, imagem_url]);
    res.status(201).json({ post: result.rows[0] });
  } catch (erro) {
    console.error("Erro ao criar post:", erro);
    res.status(500).json({ erro: "Erro ao criar post." });
  }
};

// Listar todos os posts
exports.listarPosts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, titulo, conteudo, imagem_url, data_publicacao
      FROM posts_blog
      ORDER BY data_publicacao DESC;
    `);
    res.status(200).json({ posts: result.rows });
  } catch (erro) {
    console.error("Erro ao listar posts:", erro);
    res.status(500).json({ erro: "Erro ao listar posts." });
  }
};

// Ver post por ID
exports.verPost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, titulo, conteudo, imagem_url, data_publicacao
       FROM posts_blog WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: "Post não encontrado." });
    }

    res.status(200).json({ post: result.rows[0] });
  } catch (erro) {
    console.error("Erro ao buscar post:", erro);
    res.status(500).json({ erro: "Erro ao buscar post." });
  }
};

// Editar post
exports.editarPost = async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo, imagem_url } = req.body;

  try {
    const post = await pool.query("SELECT * FROM posts_blog WHERE id = $1", [
      id,
    ]);

    if (post.rows.length === 0)
      return res.status(404).json({ mensagem: "Post não encontrado." });

    const result = await pool.query(
      `UPDATE posts_blog
       SET titulo = $1, conteudo = $2, imagem_url = $3
       WHERE id = $4
       RETURNING *;`,
      [titulo, conteudo, imagem_url, id]
    );

    res.status(200).json({ postAtualizado: result.rows[0] });
  } catch (erro) {
    console.error("Erro ao editar post:", erro);
    res.status(500).json({ erro: "Erro ao editar post." });
  }
};

// Deletar post
exports.deletarPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await pool.query("SELECT * FROM posts_blog WHERE id = $1", [
      id,
    ]);

    if (post.rows.length === 0)
      return res.status(404).json({ mensagem: "Post não encontrado." });

    await pool.query("DELETE FROM posts_blog WHERE id = $1", [id]);
    res.status(200).json({ mensagem: "Post deletado com sucesso." });
  } catch (erro) {
    console.error("Erro ao deletar post:", erro);
    res.status(500).json({ erro: "Erro ao deletar post." });
  }
};
