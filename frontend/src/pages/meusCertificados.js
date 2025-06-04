import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "../styles/estudosCientificos.css";
import ModalFormulario from "../components/ModalFormulario";

const MeusCertificados = () => {
  const [certificados, setCertificados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dadosParaEditar, setDadosParaEditar] = useState({});

  const buscarCertificados = () => {
    const token = localStorage.getItem("token_admin");

    axios
      .get("http://localhost:5000/api/certificados", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCertificados(res.data))
      .catch((err) => console.error("Erro ao buscar certificados:", err));
  };

  useEffect(() => {
    buscarCertificados();
  }, []);

  const deletarCertificado = (id) => {
    const token = localStorage.getItem("token_admin");

    if (window.confirm("Tem certeza que deseja excluir este certificado?")) {
      axios
        .delete(`http://localhost:5000/api/certificados/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => buscarCertificados())
        .catch(() => alert("Erro ao excluir."));
    }
  };

  const handleNovo = () => {
    setDadosParaEditar({
      titulo: "",
      descricao: "",
      link_pdf: "",
      lote: "",
    });
    setIsModalOpen(true);
  };

  const handleEditar = (dados) => {
    setDadosParaEditar(dados);
    setIsModalOpen(true);
  };

  const handleSalvar = (dados) => {
    const token = localStorage.getItem("token_admin");

    if (!dados.titulo || !dados.descricao || !dados.link_pdf || !dados.lote) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    if (dados.id) {
      axios
        .put(`http://localhost:5000/api/certificados/${dados.id}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarCertificados();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao atualizar o certificado."));
    } else {
      axios
        .post("http://localhost:5000/api/certificados", dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarCertificados();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao criar o certificado."));
    }
  };

  return (
    <div className="pagina-ebooks">
      <h1>Certificados de Análise</h1>

      <div className="barra-superior-blog">
        <button className="botao-publicar" onClick={handleNovo}>
          <FaPlus /> Publicar novo certificado
        </button>
      </div>

      <div className="cards-ebooks">
        {certificados.length === 0 ? (
          <p className="mensagem-vazia">Nenhum certificado publicado ainda.</p>
        ) : (
          certificados.map((cert) => (
            <div className="card-ebook" key={cert.id}>
              <h3>{cert.titulo}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: cert.descricao.substring(0, 100) + "...",
                }}
              />
              <a
                href={cert.link_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="botao-ebook"
              >
                Abrir PDF
              </a>
              <div className="acoes-ebook">
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(cert)}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => deletarCertificado(cert.id)}
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
        entidade="Certificado"
        dadosIniciais={dadosParaEditar}
      />
    </div>
  );
};

export default MeusCertificados;
