import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/postIndividual.css";

const PostIndividual = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .then((res) => setPost(res.data.post))
      .catch((err) => console.error("Erro ao buscar o post:", err));
  }, [id]);

  if (!post) return <p className="carregando">Carregando...</p>;

  return (
    <div className="post-individual-container">
      <h1>{post.titulo}</h1>
      <img src={post.imagem_url} alt={post.titulo} className="imagem-post" />
      <div
        className="conteudo-post"
        dangerouslySetInnerHTML={{ __html: post.conteudo }}
      />
    </div>
  );
};

export default PostIndividual;
