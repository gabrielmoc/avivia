import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "../styles/estudosCientificos.css"; // ✅ Mantido, conforme seu padrão
import ModalFormulario from "../components/ModalFormulario"; // ✅ Modal genérico

const MeusPatologias = () => {
  const [patologias, setPatologias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dadosParaEditar, setDadosParaEditar] = useState({});

  const buscarPatologias = () => {
    const token = localStorage.getItem("token_admin");

    axios
      .get("http://localhost:5000/api/patologias", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPatologias(res.data)) // ✅ Array direto
      .catch((err) => console.error("Erro ao buscar patologias:", err));
  };

  useEffect(() => {
    buscarPatologias();
  }, []);

  const deletarPatologia = (id) => {
    const token = localStorage.getItem("token_admin");

    if (window.confirm("Tem certeza que deseja excluir esta patologia?")) {
      axios
        .delete(`http://localhost:5000/api/patologias/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => buscarPatologias())
        .catch(() => alert("Erro ao excluir."));
    }
  };

  const handleNovo = () => {
    setDadosParaEditar({
      nome: "",
      descricao: "",
      imagem_url: "",
    });
    setIsModalOpen(true);
  };

  const handleEditar = (dados) => {
    setDadosParaEditar(dados);
    setIsModalOpen(true);
  };

  const handleSalvar = (dados) => {
    const token = localStorage.getItem("token_admin");

    if (dados.id) {
      axios
        .put(`http://localhost:5000/api/patologias/${dados.id}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarPatologias();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao atualizar a patologia."));
    } else {
      axios
        .post("http://localhost:5000/api/patologias", dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarPatologias();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao criar a patologia."));
    }
  };

  return (
    <div className="pagina-ebooks">
      {" "}
      {/* ✅ Mantido conforme seu padrão */}
      <h1>Patologias</h1>
      <button className="botao-publicar" onClick={handleNovo}>
        <FaPlus /> Publicar nova patologia
      </button>
      <div className="cards-ebooks">
        {" "}
        {/* ✅ Mantido conforme seu padrão */}
        {patologias.length === 0 ? (
          <p className="mensagem-vazia">Nenhuma patologia cadastrada.</p>
        ) : (
          patologias.map((patologia) => (
            <div className="card-ebook" key={patologia.id}>
              <img
                src={patologia.imagem_url}
                alt={patologia.nome}
                className="imagem-capa-ebook"
                onError={(e) => (e.target.style.display = "none")}
              />
              <h3>{patologia.nome}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: patologia.descricao.substring(0, 100) + "...",
                }}
              />
              <div className="acoes-ebook">
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(patologia)}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => deletarPatologia(patologia.id)}
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
        entidade="Patologia"
        dadosIniciais={dadosParaEditar}
      />
    </div>
  );
};

export default MeusPatologias;
