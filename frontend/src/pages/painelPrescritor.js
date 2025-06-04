import React, { useEffect, useState } from "react";
import "../styles/painelPrescritor.css";
import { Link } from "react-router-dom";
import {
  FaUserEdit,
  FaBook,
  FaClipboardList,
  FaFlask,
  FaFileAlt,
  FaMicroscope,
} from "react-icons/fa";
import axios from "axios";

const PainelPrescritor = () => {
  const [prescritor, setPrescritor] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPrescritor(res.data.perfil);
        })
        .catch((err) => {
          console.error("Erro ao buscar perfil:", err);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "celular") {
      const v = value.replace(/\D/g, "").slice(0, 11);
      const formatado = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      return setPrescritor((prev) => ({ ...prev, [name]: formatado }));
    }

    if (name === "cep") {
      const v = value.replace(/\D/g, "").slice(0, 8);
      const formatado = v.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
      return setPrescritor((prev) => ({ ...prev, [name]: formatado }));
    }

    if (name === "numero" || name === "numero_conselho") {
      const apenasNumeros = value.replace(/\D/g, "");
      return setPrescritor((prev) => ({ ...prev, [name]: apenasNumeros }));
    }

    setPrescritor((prev) => ({ ...prev, [name]: value }));
  };

  const buscarEndereco = async () => {
    const cepLimpo = prescritor.cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      if (!data.erro) {
        setPrescritor((prev) => ({
          ...prev,
          bairro: data.bairro,
          endereco: data.logradouro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const salvarAlteracoes = () => {
    const token = localStorage.getItem("token");

    axios
      .put("http://localhost:5000/perfil", prescritor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => alert("Dados atualizados com sucesso!"))
      .catch(() => alert("Erro ao atualizar dados."));
  };

  return (
    <div className="painel-container">
      <div className="cabecalho-painel">
        <h1>Bem-vindo, {prescritor?.nome || "Prescritor"}</h1>
        <FaUserEdit
          className="icone-usuario"
          title="Editar perfil"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        />
      </div>

      {mostrarFormulario && prescritor && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            salvarAlteracoes();
          }}
          className="form-box"
        >
          <h3>Dados do Prescritor</h3>
          <div className="linha">
            <div className="campo">
              <input
                name="nome"
                value={prescritor.nome}
                onChange={handleChange}
                placeholder="Nome *"
                required
              />
            </div>
            <div className="campo">
              <input
                name="sobrenome"
                value={prescritor.sobrenome}
                onChange={handleChange}
                placeholder="Sobrenome *"
                required
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <input
                name="celular"
                value={prescritor.celular}
                onChange={handleChange}
                placeholder="Celular *"
                required
              />
            </div>
            <div className="campo">
              <input
                type="email"
                name="email"
                value={prescritor.email}
                onChange={handleChange}
                placeholder="E-mail *"
                required
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <select
                name="tipo"
                value={prescritor.tipo}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Tipo *
                </option>
                <option value="medico">Médico</option>
                <option value="odontologista">Odontologista</option>
                <option value="veterinario">Veterinário</option>
              </select>
            </div>
            <div className="campo">
              <input
                name="especialidade"
                value={prescritor.especialidade}
                onChange={handleChange}
                placeholder="Especialidade *"
                required
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <input
                name="numero_conselho"
                value={prescritor.numero_conselho}
                onChange={handleChange}
                placeholder="Número no Conselho Regional *"
                required
              />
            </div>
            <div className="campo">
              <select
                name="estado_conselho"
                value={prescritor.estado_conselho}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Estado do Conselho *
                </option>
                {[
                  "AC",
                  "AL",
                  "AP",
                  "AM",
                  "BA",
                  "CE",
                  "DF",
                  "ES",
                  "GO",
                  "MA",
                  "MT",
                  "MS",
                  "MG",
                  "PA",
                  "PB",
                  "PR",
                  "PE",
                  "PI",
                  "RJ",
                  "RN",
                  "RS",
                  "RO",
                  "RR",
                  "SC",
                  "SP",
                  "SE",
                  "TO",
                ].map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h3>Endereço de Atendimento</h3>

          <div className="linha">
            <div className="campo">
              <input
                name="cep"
                value={prescritor.cep}
                onChange={handleChange}
                onBlur={buscarEndereco}
                placeholder="CEP *"
                required
              />
            </div>
            <div className="campo">
              <input
                name="bairro"
                value={prescritor.bairro}
                onChange={handleChange}
                placeholder="Bairro *"
                required
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <input
                name="endereco"
                value={prescritor.endereco}
                onChange={handleChange}
                placeholder="Endereço *"
                required
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <input
                name="numero"
                value={prescritor.numero}
                onChange={handleChange}
                placeholder="Número *"
                required
              />
            </div>
            <div className="campo">
              <input
                name="complemento"
                value={prescritor.complemento}
                onChange={handleChange}
                placeholder="Complemento"
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <input
                name="cidade"
                value={prescritor.cidade}
                onChange={handleChange}
                placeholder="Cidade *"
                required
              />
            </div>
            <div className="campo">
              <input
                name="estado"
                value={prescritor.estado}
                onChange={handleChange}
                placeholder="Estado *"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submeter">
            Salvar alterações
          </button>
        </form>
      )}

      <div className="cards-painel">
        <Link to="/blog" className="card-painel">
          <FaBook className="icone-card" />
          <h3>Blog</h3>
        </Link>
        <Link to="/estudos-cientificos" className="card-painel">
          <FaMicroscope className="icone-card" />
          <h3>Patologias</h3>
        </Link>
        <Link to="/estudos-cientificos" className="card-painel">
          <FaClipboardList className="icone-card" />
          <h3>Estudos Científicos</h3>
        </Link>
        <Link to="/meus-ebooks" className="card-painel">
          <FaFileAlt className="icone-card" />
          <h3>E-books</h3>
        </Link>
        <Link to="/certificados" className="card-painel">
          <FaFlask className="icone-card" />
          <h3>Certificados</h3>
        </Link>
      </div>
    </div>
  );
};

export default PainelPrescritor;
