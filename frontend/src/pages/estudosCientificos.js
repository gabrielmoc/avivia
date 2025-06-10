import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/estudosCientificos.css";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL; // ✅ Adicionado

const EstudosCientificos = () => {
  const [patologias, setPatologias] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/patologias`) // ✅ Corrigido aqui
      .then((res) => setPatologias(res.data))
      .catch((err) => console.error("Erro ao buscar patologias:", err));
  }, []);

  const filtradas = patologias.filter((item) =>
    item.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="pagina-estudos">
      <h1>Estudos Científicos</h1>
      <p className="subtitulo">
        Escolha uma patologia para visualizar os estudos disponíveis
      </p>

      <input
        type="text"
        placeholder="Buscar patologia..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="campo-busca-estudo"
      />

      <div className="cards-estudos">
        {filtradas.length > 0 ? (
          filtradas.map((item) => (
            <Link
              to={`/estudos/${item.id}`}
              key={item.id}
              className="card-estudo"
            >
              <img
                src={
                  item.imagem_url.startsWith("/uploads/")
                    ? `${API_URL}${item.imagem_url}`
                    : item.imagem_url
                }
                alt={item.nome}
                className="imagem-estudo"
              />
              <h3>{item.nome}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.descricao.substring(0, 1000),
                }}
              />
            </Link>
          ))
        ) : (
          <p className="mensagem-vazia">Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default EstudosCientificos;
