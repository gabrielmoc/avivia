import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalFormulario from "../components/ModalFormulario";
import "../components/modalFormulario.css";
import "../styles/blog.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const MeusBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dadosParaEditar, setDadosParaEditar] = useState({});
  const API_URL = process.env.REACT_APP_API_URL;

  const buscarPosts = () => {
    const token = localStorage.getItem("token_admin");

    axios
      .get(`${API_URL}/api/blog`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.error("Erro ao buscar posts:", err));
  };

  const deletarPost = (id) => {
    const token = localStorage.getItem("token_admin");

    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      axios
        .delete(`${API_URL}/api/blog/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => buscarPosts())
        .catch(() => alert("Erro ao excluir o post."));
    }
  };

  const handleNovo = () => {
    setDadosParaEditar({
      titulo: "",
      conteudo: "",
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

    if (dados.get) {
      // Se for FormData → ler campos obrigatórios
      const titulo = dados.get("titulo");
      const conteudo = dados.get("conteudo");

      if (!titulo || !conteudo) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
      }

      // Verifica se tem id no FormData → PUT ou POST
      if (!dados.get("id")) {
        // POST → novo post
        axios
          .post(`${API_URL}/api/blog`, dados, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            buscarPosts();
            setIsModalOpen(false);
          })
          .catch(() => alert("Erro ao criar o post."));
      } else {
        // PUT → atualizar post existente
        axios
          .put(`${API_URL}/api/blog/${dados.get("id")}`, dados, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            buscarPosts();
            setIsModalOpen(false);
          })
          .catch(() => alert("Erro ao atualizar o post."));
      }
    }
  };

  useEffect(() => {
    buscarPosts();
  }, []);

  return (
    <div className="pagina-blog">
      <h1>Gerenciar Posts do Blog</h1>

      <div className="barra-superior-blog">
        <button className="botao-publicar" onClick={handleNovo}>
          <FaPlus /> Publicar novo post
        </button>
      </div>

      <div className="cards-blog">
        {posts.length === 0 ? (
          <p className="mensagem-vazia">Nenhum post publicado ainda.</p>
        ) : (
          posts.map((post) => (
            <div className="card-blog" key={post.id}>
              <img
                src={
                  post.imagem_url.startsWith("/uploads/")
                    ? `${API_URL}${post.imagem_url}`
                    : post.imagem_url
                }
                alt={post.titulo}
                className="imagem-blog"
              />

              <h3>{post.titulo}</h3>
              <div
                className="conteudo-post"
                dangerouslySetInnerHTML={{
                  __html: post.conteudo.substring(0, 50),
                }}
              />
              <p className="data-post">
                Publicado em:{" "}
                {new Date(post.data_publicacao).toLocaleDateString()}
              </p>
              <div className="acoes-blog">
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(post)}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => deletarPost(post.id)}
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
        entidade="Blog"
        dadosIniciais={dadosParaEditar}
      />
    </div>
  );
};

export default MeusBlogs;
