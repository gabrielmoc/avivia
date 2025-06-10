import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/blog.css";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL; // Adiciona aqui

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blog`) // Corrigido aqui
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.error("Erro ao buscar posts:", err));
  }, []);

  const postsFiltrados = posts.filter((post) =>
    post.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="pagina-blog">
      <h1>Blog Avivia</h1>

      <input
        type="text"
        placeholder="Buscar post..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="campo-busca-blog"
      />

      <div className="cards-blog">
        {postsFiltrados.length > 0 ? (
          postsFiltrados.map((post) => (
            <Link to={`/blog/${post.id}`} className="card-blog" key={post.id}>
              <img
                src={
                  post.imagem_url.startsWith("/uploads/")
                    ? `${API_URL}${post.imagem_url}`
                    : post.imagem_url
                }
                alt={post.titulo}
                className="imagem-capa-blog"
              />
              <h3>{post.titulo}</h3>
              <div
                className="conteudo-post"
                dangerouslySetInnerHTML={{
                  __html: post.conteudo.substring(0, 50),
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

export default Blog;
