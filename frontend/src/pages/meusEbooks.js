import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ebooks.css";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import ModalFormulario from "../components/ModalFormulario";

const MeusEbooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dadosParaEditar, setDadosParaEditar] = useState({});

  const buscarMeusEbooks = () => {
    const token = localStorage.getItem("token_admin");

    axios
      .get("http://localhost:5000/api/ebooks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEbooks(res.data)) // ✅ API retorna array direto!
      .catch((err) => console.error("Erro ao buscar ebooks:", err));
  };

  useEffect(() => {
    buscarMeusEbooks();
  }, []);

  const deletarEbook = (id) => {
    const token = localStorage.getItem("token_admin");

    if (window.confirm("Tem certeza que deseja excluir este e-book?")) {
      axios
        .delete(`http://localhost:5000/api/ebooks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => buscarMeusEbooks())
        .catch(() => alert("Erro ao excluir."));
    }
  };

  const handleNovo = () => {
    setDadosParaEditar({
      titulo: "",
      descricao: "",
      link_pdf: "",
      imagem_url: "",
      data_publicacao: new Date().toISOString(),
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
        .put(`http://localhost:5000/api/ebooks/${dados.id}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarMeusEbooks();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao atualizar o e-book."));
    } else {
      axios
        .post("http://localhost:5000/api/ebooks", dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          buscarMeusEbooks();
          setIsModalOpen(false);
        })
        .catch(() => alert("Erro ao criar o e-book."));
    }
  };

  return (
    <div className="pagina-ebooks">
      <h1>Meus E-books</h1>
      <button className="botao-publicar" onClick={handleNovo}>
        <FaPlus /> Publicar novo e-book
      </button>

      <div className="cards-ebooks">
        {ebooks.length === 0 ? (
          <p className="mensagem-vazia">Nenhum e-book publicado.</p>
        ) : (
          ebooks.map((ebook) => (
            <div className="card-ebook" key={ebook.id}>
              <img
                src={ebook.imagem_url}
                alt={ebook.titulo}
                className="imagem-capa-ebook"
              />
              <h3>{ebook.titulo}</h3>
              <div
                className="descricao-ebook"
                dangerouslySetInnerHTML={{
                  __html: ebook.descricao.substring(0, 100) + "...",
                }}
              />
              <a
                href={ebook.link_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="botao-ebook"
              >
                Abrir PDF
              </a>
              <div className="acoes-ebook">
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(ebook)}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => deletarEbook(ebook.id)}
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
        entidade="Ebook"
        dadosIniciais={dadosParaEditar}
      />
    </div>
  );
};

export default MeusEbooks;
