import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../components/modalFormulario.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

Modal.setAppElement("#root");

const ModalFormulario = ({
  isOpen,
  onClose,
  onSubmit,
  entidade,
  dadosIniciais = {},
  patologias = [],
}) => {
  const [formData, setFormData] = useState(dadosIniciais);
  const [imagemArquivo, setImagemArquivo] = useState(null); // novo state para upload

  useEffect(() => {
    setFormData(dadosIniciais);
    setImagemArquivo(null); // reseta o arquivo ao abrir modal
  }, [dadosIniciais]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cria FormData
    const formDataToSend = new FormData();

    // Adiciona todos os campos do formData
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Se tiver imagem em arquivo, adiciona no FormData com o campo "imagem"
    if (imagemArquivo) {
      formDataToSend.append("imagem", imagemArquivo);
    }

    // Chama o onSubmit passando o FormData completo
    onSubmit(formDataToSend);

    onClose();
  };

  const modules = {
    toolbar: [
      { header: [1, 2, 3, false] },
      "bold",
      "italic",
      "underline",
      "strike",
      { list: "ordered" },
      { list: "bullet" },
      "link",
      "clean",
    ],
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={`Formulário ${entidade}`}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{formData.id ? `Editar ${entidade}` : `Novo ${entidade}`}</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((campo, index) => {
          if (campo === "id") return null;

          return (
            <div key={index}>
              <label>{campo}</label>

              {campo === "conteudo" || campo === "descricao" ? (
                <ReactQuill
                  value={formData[campo] || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, [campo]: value }))
                  }
                  modules={modules}
                />
              ) : campo === "data_publicacao" ? (
                <input
                  type="text"
                  name={campo}
                  value={
                    formData[campo]
                      ? new Date(formData[campo])
                          .toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          .replace(",", " -")
                      : ""
                  }
                  disabled
                />
              ) : campo === "patologia_id" ? (
                <select
                  name={campo}
                  value={formData[campo] || ""}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma Patologia</option>
                  {patologias.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              ) : campo === "imagem_url" ? (
                <>
                  <input
                    name={campo}
                    value={formData[campo] || ""}
                    onChange={handleChange}
                    placeholder="URL da imagem (opcional)"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagemArquivo(e.target.files[0])}
                  />
                </>
              ) : (
                <input
                  name={campo}
                  value={formData[campo] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          );
        })}

        <button type="submit">Salvar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
};

export default ModalFormulario;
