import axios from "axios";
const API = "http://localhost:5000/api/feedback";

export const listarFeedbacks = (limite = 10) =>
  axios.get(`${API}?limite=${limite}`);

// POST: criar novo feedback (autenticado)
export const criarFeedback = (dados, token) =>
  axios.post(API, dados, {
    headers: { Authorization: `Bearer ${token}` },
  });

// PUT: atualizar um feedback existente
export const atualizarFeedback = (id, dados, token) =>
  axios.put(`${API}/${id}`, dados, {
    headers: { Authorization: `Bearer ${token}` },
  });

// DELETE: excluir um feedback pelo ID
export const excluirFeedback = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
