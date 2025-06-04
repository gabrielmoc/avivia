import React from "react";
import "./footer.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/full_logo_branca.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col esquerda">
          <div className="logo-bloco">
            <Link to="/">
              <img src={logo} alt="Logo Avivia" className="footer-logo" />
            </Link>
            <p className="slogan">
              Cuidar de você
              <br />é a nossa essência.
            </p>
          </div>
        </div>

        <div className="footer-col centro">
          <h4>Menu</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={{ pathname: "/", search: "?scrollTo=sobrenos" }}>
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/area-prescritor">Área do Prescritor</Link>
            </li>
            <li>
              <Link to={{ pathname: "/", search: "?scrollTo=faq" }}>FAQ</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col direita">
          <h4>Contato</h4>
          <ul>
            <li>
              <FaPhone className="icon" />
              <a href="tel:+5581960002016">(81) 96000-2016</a>
            </li>
            <li>
              <FaEnvelope className="icon" />
              <a href="mailto:contato@avivia.com.br">contato@avivia.com.br</a>
            </li>
            <li>
              <FaMapMarkerAlt className="icon" />
              <a
                href="https://maps.google.com/?q=Av. República do Líbano, 251"
                target="_blank"
                rel="noreferrer"
              >
                Av. República do Líbano, 251
              </a>
            </li>
            <li>
              <FaInstagram className="icon" />
              <a
                href="https://www.instagram.com/aviviacbd/"
                target="_blank"
                rel="noreferrer"
              >
                @aviviacbd
              </a>
            </li>
            <li>
              <FaLinkedin className="icon" />
              <a
                href="https://www.linkedin.com/company/aviviabr/"
                target="_blank"
                rel="noreferrer"
              >
                @aviviabr
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        Desenvolvido por{" "}
        <strong>
          <a
            href="https://gabrielcavalcanti.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gabriel Cavalcanti
          </a>
        </strong>{" "}
        © 2025 Avivia. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
