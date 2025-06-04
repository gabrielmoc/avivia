import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- adicionado
import "../styles/loginPrescritor.css";
import logo from "../assets/logo_branca.png";
import axios from "axios";

const LoginPrescritor = () => {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate(); // <-- hook do React Router

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post("http://localhost:5000/login", form);
      const { token } = response.data;

      localStorage.setItem("token", token);
      navigate("/area-prescritor"); // <-- redireciona para o painel
    } catch (error) {
      setErro("E-mail ou senha incorretos.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo Avivia" className="logo-login" />
      </div>

      <div className="box-login">
        <h2>Acessar Prescritor</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          {erro && <p className="mensagem-erro">{erro}</p>}

          <button type="submit">Entrar</button>
        </form>
        <Link to="/esqueci-senha" className="esqueci-senha">
          Esqueceu sua senha?
        </Link>
      </div>
    </div>
  );
};

export default LoginPrescritor;
