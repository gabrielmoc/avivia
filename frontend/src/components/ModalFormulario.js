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

  useEffect(() => {
    setFormData(dadosIniciais);
  }, [dadosIniciais]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
              ) : campo === "patologia_id" ? ( // ✅ SELECT para patologia_id
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
