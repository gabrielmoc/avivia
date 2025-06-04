import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./header.css";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef();
  const botaoRef = useRef();

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuAberto &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        botaoRef.current &&
        !botaoRef.current.contains(event.target) // impede duplo clique
      ) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="Logo Aviva" className="logo" />
        </Link>

        <button ref={botaoRef} className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon">&#9776;</span>
        </button>

        <nav ref={menuRef} className={`menu ${menuAberto ? "ativo" : ""}`}>
          <Link to="/">Home</Link>
          <Link to={{ pathname: "/", search: "?scrollTo=sobrenos" }}>
            Sobre Nós
          </Link>
          <Link to="/blog">Blog</Link>
          <Link to="/area-prescritor">Área do Prescritor</Link>
          <Link to={{ pathname: "/", search: "?scrollTo=faq" }}>FAQ</Link>
          <a
            href="https://api.whatsapp.com/message/RWOGXBD4ZXASP1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="botao-contato"
          >
            Entrar em Contato
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
