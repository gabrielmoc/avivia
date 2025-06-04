import React, { useState } from "react";
import "../styles/esqueciSenha.css";
import logo from "../assets/logo_branca.png";
import axios from "axios";

const EsqueciSenhaPrescritor = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro("");

    try {
      await axios.post("http://localhost:5000/esqueci-senha", { email });
      setMensagem(
        "Se encontrarmos este e-mail no sistema, enviaremos as instruções para redefinir a senha."
      );
      setEmail("");
    } catch (error) {
      setErro("Erro ao processar solicitação. Tente novamente mais tarde.");
      console.error(error);
    }
  };

  return (
    <div className="esqueci-container">
      <img src={logo} alt="Logo Avivia" className="logo-login" />

      <div className="box-esqueci">
        <h2>Recuperar Acesso</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Enviar instruções</button>
        </form>

        {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
        {erro && <p className="mensagem-erro">{erro}</p>}

        <a href="/login-prescritor" className="voltar-login">
          Voltar ao login
        </a>
      </div>
    </div>
  );
};

export default EsqueciSenhaPrescritor;
