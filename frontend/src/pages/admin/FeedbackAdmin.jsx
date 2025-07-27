import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalFormulario from "../../components/ModalFormulario";
import "../../components/modalFormulario.css";
import "../../styles/feedback.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const FeedbackAdmin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dadosParaEditar, setDadosParaEditar] = useState({});

  const buscarFeedbacks = () => {
    const token = localStorage.getItem("token_admin");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFeedbacks(res.data.feedbacks))
      .catch((err) => console.error("Erro ao buscar feedbacks:", err));
  };

  const deletarFeedback = (id) => {
    const token = localStorage.getItem("token_admin");

    if (window.confirm("Tem certeza que deseja excluir este feedback?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/feedback/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => buscarFeedbacks())
        .catch(() => alert("Erro ao excluir o feedback."));
    }
  };

  const handleNovo = () => {
    setDadosParaEditar({
      nome: "",
      texto: "",
      estrelas: 5,
    });
    setIsModalOpen(true);
  };

  const handleEditar = (feedback) => {
    setDadosParaEditar(feedback);
    setIsModalOpen(true);
  };

  const handleSalvar = (dados) => {
    const token = localStorage.getItem("token_admin");

    if (dados.id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/feedback/${dados.id}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarFeedbacks();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao atualizar o feedback."));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/feedback`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarFeedbacks();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao criar o feedback."));
    }
  };

  useEffect(() => {
    buscarFeedbacks();
  }, []);

  return (
    <div className="pagina-feedback">
      <h1>Gerenciar Feedbacks</h1>

      <div className="barra-superior-feedback">
        <button className="botao-publicar" onClick={handleNovo}>
          <FaPlus /> Novo Feedback
        </button>
      </div>

      <div className="cards-feedback">
        {feedbacks.length === 0 ? (
          <p className="mensagem-vazia">Nenhum feedback cadastrado ainda.</p>
        ) : (
          feedbacks.map((f) => (
            <div className="card-feedback-admin" key={f.id}>
              <p className="texto">{f.texto}</p>
              <span className="nome">
                {f.nome} — {f.estrelas}★
              </span>
              <div className="acoes">
                <button className="btn-editar" onClick={() => handleEditar(f)}>
                  <FaEdit /> Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => deletarFeedback(f.id)}
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
        entidade="Feedback"
        dadosIniciais={dadosParaEditar}
      />
    </div>
  );
};

export default FeedbackAdmin;
