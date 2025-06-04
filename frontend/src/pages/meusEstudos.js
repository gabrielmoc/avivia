import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/estudosCientificos.css";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import ModalFormulario from "../components/ModalFormulario";

const MeusEstudos = () => {
  const [estudos, setEstudos] = useState([]);
  const [patologias, setPatologias] = useState([]); // ✅ NOVO state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dadosParaEditar, setDadosParaEditar] = useState({});

  const buscarEstudos = () => {
    const token = localStorage.getItem("token_admin");

    axios
      .get("http://localhost:5000/api/estudos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEstudos(res.data))
      .catch((err) => console.error("Erro ao buscar estudos:", err));
  };

  const buscarPatologias = () => {
    axios
      .get("http://localhost:5000/api/patologias")
      .then((res) => setPatologias(res.data))
      .catch((err) => console.error("Erro ao buscar patologias:", err));
  };

  useEffect(() => {
    buscarEstudos();
    buscarPatologias();
  }, []);

  const deletarEstudo = (id) => {
    const token = localStorage.getItem("token_admin");

    if (window.confirm("Tem certeza que deseja excluir este estudo?")) {
      axios
        .delete(`http://localhost:5000/api/estudos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => buscarEstudos())
        .catch(() => alert("Erro ao excluir estudo."));
    }
  };

  const handleNovo = () => {
    setDadosParaEditar({
      titulo: "",
      link_estudo: "",
      patologia_id: "",
      descricao: "",
      imagem_url: "",
    });
    setIsModalOpen(true);
  };

  const handleEditar = (dados) => {
    setDadosParaEditar({
      ...dados,
      patologia_id: dados.patologia_id || "", // ✅ Garante que o campo exista!
    });
    setIsModalOpen(true);
  };

  const handleSalvar = (dados) => {
    const token = localStorage.getItem("token_admin");

    if (
      !dados.titulo ||
      !dados.descricao ||
      !dados.link_estudo ||
      !dados.patologia_id
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    if (dados.id) {
      axios
        .put(`http://localhost:5000/api/estudos/${dados.id}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarEstudos();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao atualizar o estudo."));
    } else {
      axios
        .post("http://localhost:5000/api/estudos", dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarEstudos();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao criar o estudo."));
    }
  };

  return (
    <div className="pagina-ebooks">
      <h1>Estudos Científicos</h1>
      <button className="botao-publicar" onClick={handleNovo}>
        <FaPlus /> Publicar novo estudo
      </button>

      <div className="cards-ebooks">
        {estudos.length === 0 ? (
          <p className="mensagem-vazia">Nenhum estudo publicado ainda.</p>
        ) : (
          estudos.map((estudo) => (
            <div className="card-ebook" key={estudo.id}>
              <img
                src={estudo.imagem_url}
                alt={estudo.titulo}
                className="imagem-capa-ebook"
                onError={(e) => (e.target.style.display = "none")}
              />
              <h3>{estudo.titulo}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: estudo.descricao.substring(0, 100) + "...",
                }}
              />
              <a
                href={estudo.link_estudo}
                target="_blank"
                rel="noopener noreferrer"
                className="botao-ebook"
              >
                Abrir Estudo
              </a>
              <div className="acoes-ebook">
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(estudo)}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => deletarEstudo(estudo.id)}
                >
                  <FaTrash /> Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ModalFormulario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSalvar}
        entidade="Estudo"
        dadosIniciais={dadosParaEditar}
        patologias={patologias} // ✅ Passando as patologias
      />
    </div>
  );
};

export default MeusEstudos;
