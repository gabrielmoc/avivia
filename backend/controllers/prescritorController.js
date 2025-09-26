const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.cadastrarPrescritor = async (req, res) => {
  const {
    nome,
    sobrenome,
    email,
    celular,
    senha,
    tipo,
    especialidade,
    numero_conselho,
    estado_conselho,
    cep,
    bairro,
    endereco,
    numero,
    complemento,
    cidade,
    estado,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    const query = `
      INSERT INTO prescritores (
        nome, sobrenome, email, celular, senha, tipo,
        especialidade, numero_conselho, estado_conselho,
        cep, bairro, endereco, numero, complemento, cidade, estado
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
      )
    `;

    const values = [
      nome,
      sobrenome,
      email,
      celular,
      hashedPassword,
      tipo,
      especialidade,
      numero_conselho,
      estado_conselho,
      cep,
      bairro,
      endereco,
      numero,
      complemento,
      cidade,
      estado,
    ];

    await pool.query(query, values);
    res.status(201).json({ mensagem: "Prescritor cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar prescritor:", error);
    res.status(500).json({ erro: "Erro ao cadastrar prescritor." });
  }
};

exports.loginPrescritor = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM prescritores WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: "Prescritor não encontrado." });
    }

    const prescritor = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, prescritor.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    const token = jwt.sign({ id: prescritor.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      dados: {
        nome: prescritor.nome,
        email: prescritor.email,
        tipo: prescritor.tipo,
      },
    });
  } catch (erro) {
    console.error("Erro no login:", erro);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

exports.perfilPrescritor = async (req, res) => {
  try {
    const id = req.usuario.id;
    const result = await pool.query(
      `SELECT nome, sobrenome, email, celular, tipo, especialidade, numero_conselho,
              estado_conselho, cep, bairro, endereco, numero, complemento, cidade, estado
       FROM prescritores WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: "Prescritor não encontrado." });
    }

    res.status(200).json({ perfil: result.rows[0] });
  } catch (erro) {
    console.error("Erro ao buscar perfil:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar perfil." });
  }
};

// Atualizar perfil do prescritor
exports.atualizarPerfil = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const idPrescritor = decoded.id;

    const {
      nome,
      sobrenome,
      email,
      celular,
      tipo,
      especialidade,
      numero_conselho,
      estado_conselho,
      cep,
      bairro,
      endereco,
      numero,
      complemento,
      cidade,
      estado,
    } = req.body;

    await pool.query(
      `UPDATE prescritores SET
        nome = $1,
        sobrenome = $2,
        email = $3,
        celular = $4,
        tipo = $5,
        especialidade = $6,
        numero_conselho = $7,
        estado_conselho = $8,
        cep = $9,
        bairro = $10,
        endereco = $11,
        numero = $12,
        complemento = $13,
        cidade = $14,
        estado = $15,
        atualizado_em = CURRENT_TIMESTAMP
      WHERE id = $16`,
      [
        nome,
        sobrenome,
        email,
        celular,
        tipo,
        especialidade,
        numero_conselho,
        estado_conselho,
        cep,
        bairro,
        endereco,
        numero,
        complemento,
        cidade,
        estado,
        idPrescritor,
      ]
    );

    res.status(200).json({ mensagem: "Perfil atualizado com sucesso." });
  } catch (erro) {
    console.error("Erro ao atualizar perfil:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar perfil." });
  }
};
