import React from "react";
import "../styles/acessoPrescritor.css";
import logo from "../assets/logo_texto_azul.png";
import imagemPrescritor from "../assets/desenho_medica.png";
import { Link } from "react-router-dom";

const AcessoPrescritor = () => {
  return (
    <section className="acesso-prescritor">
      <div className="conteudo-acesso">
        <div className="texto-acesso">
          <div className="topo-logo">
            <img src={logo} alt="Logo Avivia" className="logo-avivia" />
          </div>
          <h2>Área do Prescritor</h2>
          <p>
            Bem-vindo, prescritor! <br />
            Acesse ou cadastre-se para usar o sistema.
          </p>

          <Link to="/cadastro-prescritor" className="btn-primario">
            Cadastrar novo prescritor
          </Link>
          <Link to="/login-prescritor" className="btn-secundario">
            Já tenho conta – Login
          </Link>
        </div>

        <div className="imagem-acesso">
          <img src={imagemPrescritor} alt="Prescritor" />
        </div>
      </div>
    </section>
  );
};

export default AcessoPrescritor;
