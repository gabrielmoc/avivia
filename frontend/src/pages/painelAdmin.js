import React from "react";
import "../styles/painelAdmin.css";

import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaClipboardList,
  FaFlask,
  FaFileAlt,
  FaMicroscope,
  FaSignOutAlt,
  FaStar,
} from "react-icons/fa";

const PainelAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token_admin");
    navigate("/admin");
  };

  return (
    <div className="painel-container">
      <div className="cabecalho-painel">
        <div className="cabecalho-info">
          <h1>Painel do Administrador</h1>
          <button className="btn-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </div>

      <div className="cards-painel">
        <Link to="/meus-blogs" className="card-painel">
          <FaBook className="icone-card" />
          <h3>Blog</h3>
        </Link>
        <Link to="/meus-patologias" className="card-painel">
          <FaMicroscope className="icone-card" />
          <h3>Patologias</h3>
        </Link>
        <Link to="/meus-estudos" className="card-painel">
          <FaClipboardList className="icone-card" />
          <h3>Estudos Científicos</h3>
        </Link>
        <Link to="/meus-ebooks" className="card-painel">
          <FaFileAlt className="icone-card" />
          <h3>E-books</h3>
        </Link>
        <Link to="/meus-certificados" className="card-painel">
          <FaFlask className="icone-card" />
          <h3>Certificados</h3>
        </Link>
        <Link to="/admin/meus-feedbacks" className="card-painel">
          + <FaStar className="icone-card" /> {/* ícone que você importou */}+{" "}
          <h3>Feedbacks</h3>+{" "}
        </Link>
      </div>
    </div>
  );
};

export default PainelAdmin;
