import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import "../styles/areaPrescritor.css";
import bannerImg from "../assets/banner-area-prescritor.png";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";

const AreaPrescritor = () => {
  const [prescritor, setPrescritor] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/perfil", {
          headers: { Authorization: `Bearer ${token}` },
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/acesso-prescritor");
  };

  return (
    <div className="area-prescritor-container">
      {/* BANNER */}
      <section className="banner">
        <img
          src={bannerImg}
          alt="Banner Prescritor"
          className="banner-imagem"
        />
        <div className="banner-conteudo">
          <h1>Área do Prescritor</h1>
          <p>Acesse nosso material de suporte a prescritores.</p>
        </div>
      </section>

      <div className="cabecalho-painel">
        <div className="cabecalho-info">
          <h2>Bem-vindo, {prescritor?.nome || "Prescritor"}</h2>
          <FaUserEdit
            className="icone-usuario"
            title="Editar perfil"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          />
          <button className="btn-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </div>

      {mostrarFormulario && prescritor && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            salvarAlteracoes();
          }}
          className="form-box"
        >
          {/* --- FORMULÁRIO --- */}
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

      {/* CARDS */}
      <section className="cards-container">
        <div className="card">
          <Link to="/estudos-cientificos">
            <img src={card1} alt="Estudos científicos" />
            <h3>Estudos científicos</h3>
            <p>Acesse nossa base de estudos científicos</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/ebooks">
            <img src={card2} alt="Ebooks científicos" />
            <h3>Ebooks</h3>
            <p>Acompanhe nossos Ebooks científicos</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/certificados">
            <img src={card3} alt="Certificados de análise" />
            <h3>Certificados de análise</h3>
            <p>Confira o certificado de análise dos nossos produtos</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AreaPrescritor;
