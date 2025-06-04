import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/certificados.css";
import frasco from "../assets/frasco.png";

const Certificados = () => {
  const [certificados, setCertificados] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/certificados")
      .then((res) => setCertificados(res.data))
      .catch((err) => console.error("Erro ao buscar certificados:", err));
  }, []);

  const certificadosFiltrados = certificados.filter((item) =>
    item.lote.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="pagina-certificados">
      <h1>Certificados de Análise</h1>

      <div className="secao-intro-certificado">
        <div className="intro-texto">
          <p>
            Para consultar o certificado de análise, feito por um laboratório
            independente, e garantir que o seu medicamento é da melhor
            qualidade, basta digitar no campo abaixo o número do lote presente
            na parte inferior do seu produto.
          </p>
          <input
            type="text"
            placeholder="Buscar por lote..."
            className="campo-busca"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <div className="intro-imagem">
          <img src={frasco} alt="Frasco do produto" />
          <p className="legenda-imagem">Verifique o lote embaixo do frasco</p>
        </div>
      </div>

      <div className="cards-certificados">
        {certificadosFiltrados.length === 0 ? (
          <p className="mensagem-vazia">Nenhum certificado encontrado.</p>
        ) : (
          certificadosFiltrados.map((item) => (
            <a
              href={item.link_pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="card-certificado"
              key={item.id}
            >
              <h3>{item.titulo}</h3>
              <p>{item.descricao}</p>
              <p className="lote">Lote: {item.lote}</p>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default Certificados;
