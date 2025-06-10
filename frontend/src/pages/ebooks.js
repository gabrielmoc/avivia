import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ebooks.css";

const API_URL = process.env.REACT_APP_API_URL; // ✅ Adicionado

const Ebooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/ebooks`) // ✅ Corrigido
      .then((res) => setEbooks(res.data))
      .catch((err) => console.error("Erro ao buscar ebooks:", err));
  }, []);

  const ebooksFiltrados = ebooks.filter((ebook) =>
    ebook.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="pagina-ebooks">
      <h1>E-books Científicos</h1>

      <input
        type="text"
        placeholder="Buscar e-book..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="campo-busca-ebook"
      />

      <div className="cards-ebooks">
        {ebooksFiltrados.length > 0 ? (
          ebooksFiltrados.map((ebook) => (
            <a
              key={ebook.id}
              href={ebook.link_pdf}
              className="card-ebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={
                  ebook.imagem_url.startsWith("/uploads/")
                    ? `${API_URL}${ebook.imagem_url}`
                    : ebook.imagem_url
                }
                alt={ebook.titulo}
                className="imagem-capa-ebook"
              />
              <h3>{ebook.titulo}</h3>
              <div
                className="descricao-ebook"
                dangerouslySetInnerHTML={{
                  __html: ebook.descricao.substring(0, 120) + "...",
                }}
              />
            </a>
          ))
        ) : (
          <p className="mensagem-vazia">Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Ebooks;
