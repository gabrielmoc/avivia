const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const resultado = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);

    if (resultado.rows.length === 0) {
      return res
        .status(401)
        .json({ mensagem: "Administrador não encontrado." });
    }

    const admin = resultado.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, admin.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, mensagem: "Login realizado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao fazer login do admin:", erro);
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
