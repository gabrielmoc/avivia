import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/estudosPorPatologia.css";

const EstudosPorPatologia = () => {
  const { id } = useParams();
  const [estudos, setEstudos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [patologia, setPatologia] = useState(null);

  useEffect(() => {
    // Buscar dados da patologia
    axios
      .get(`http://localhost:5000/api/patologias/${id}`)
      .then((res) => setPatologia(res.data))
      .catch((err) => console.error("Erro ao buscar patologia:", err));

    // Buscar estudos por patologia
    axios
      .get(`http://localhost:5000/api/estudos/patologia/${id}`)
      .then((res) => setEstudos(res.data))
      .catch((err) => console.error("Erro ao buscar estudos:", err));
  }, [id]);

  const estudosFiltrados = estudos.filter((estudo) =>
    estudo.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="pagina-estudos">
      {patologia && (
        <>
          <h1 className="titulo-patologia">{patologia.nome}</h1>
          <p className="descricao-patologia">
            Confira os estudos científicos sobre{" "}
            <strong>{patologia.nome}</strong>.
          </p>
        </>
      )}

      <input
        type="text"
        placeholder="Buscar estudo..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="campo-busca-estudo"
      />

      <div className="cards-estudos">
        {estudosFiltrados.length > 0 ? (
          estudosFiltrados.map((estudo) => (
            <a
              key={estudo.id}
              href={estudo.link_estudo}
              target="_blank"
              rel="noopener noreferrer"
              className="card-estudo"
            >
              <img
                src={estudo.imagem_url}
                alt={estudo.titulo}
                className="imagem-estudo"
              />
              <h3>{estudo.titulo}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: estudo.descricao.substring(0, 100) + "...",
                }}
              />
            </a>
          ))
        ) : (
          <p style={{ marginTop: "2rem" }}>Nenhum estudo encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default EstudosPorPatologia;
