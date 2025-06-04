import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/loginAdmin.css";

const LoginAdmin = () => {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/admin/login", form);
      localStorage.setItem("token_admin", res.data.token);
      navigate("/admin/painel");
    } catch (error) {
      alert("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="login-admin">
      <h2>Login do Administrador</h2>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginAdmin;
