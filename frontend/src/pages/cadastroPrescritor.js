import React, { useState } from "react";
import "../styles/cadastroPrescritor.css";
import logo from "../assets/logo.png";
import axios from "axios";

const CadastroPrescritor = () => {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    celular: "",
    senha: "",
    repetir_senha: "",
    tipo: "",
    especialidade: "",
    numero_conselho: "",
    estado_conselho: "",
    cep: "",
    bairro: "",
    endereco: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    email: "",
  });

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "celular") {
      const v = value.replace(/\D/g, "").slice(0, 11);
      const formatado = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      return setForm((prev) => ({ ...prev, [name]: formatado }));
    }

    if (name === "cep") {
      const v = value.replace(/\D/g, "").slice(0, 8);
      const formatado = v.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
      return setForm((prev) => ({ ...prev, [name]: formatado }));
    }

    if (name === "numero") {
      const apenasNumeros = value.replace(/\D/g, "");
      return setForm((prev) => ({ ...prev, [name]: apenasNumeros }));
    }

    if (name === "numero_conselho") {
      const apenasNumeros = value.replace(/\D/g, "");
      return setForm((prev) => ({ ...prev, [name]: apenasNumeros }));
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buscarEndereco = async () => {
    const cepLimpo = form.cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      if (!data.erro) {
        setForm((prev) => ({
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

  const validarFormulario = () => {
    const novosErros = {};

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      novosErros.email = "E-mail inválido";
    if (form.celular.replace(/\D/g, "").length !== 11)
      novosErros.celular = "Celular inválido";
    if (form.cep.replace(/\D/g, "").length !== 8)
      novosErros.cep = "CEP inválido";
    if (form.senha.length < 8)
      novosErros.senha = "A senha deve ter no mínimo 8 caracteres";
    if (form.senha !== form.repetir_senha)
      novosErros.repetir_senha = "As senhas não coincidem";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const { repetir_senha, ...formularioLimpo } = form;
      await axios.post("http://localhost:5000/api/cadastro", formularioLimpo);
      alert("Cadastro realizado com sucesso!");
      setForm({
        nome: "",
        sobrenome: "",
        celular: "",
        senha: "",
        repetir_senha: "",
        tipo: "",
        especialidade: "",
        numero_conselho: "",
        estado_conselho: "",
        cep: "",
        bairro: "",
        endereco: "",
        numero: "",
        complemento: "",
        cidade: "",
        estado: "",
        email: "",
      });
    } catch (error) {
      alert("Erro ao cadastrar prescritor.");
      console.error(error);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="form-box">
        <img src={logo} alt="Logo Avivia" className="logo-cadastro" />
        <h2>Cadastro do Prescritor</h2>

        <form onSubmit={handleSubmit}>
          <div className="linha">
            <div className="campo">
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome *"
                className={erros.nome ? "erro" : ""}
                required
              />
              {erros.nome && (
                <span className="mensagem-erro">{erros.nome}</span>
              )}
            </div>
            <div className="campo">
              <input
                name="sobrenome"
                value={form.sobrenome}
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
                value={form.celular}
                onChange={handleChange}
                placeholder="Celular *"
                className={erros.celular ? "erro" : ""}
              />
              {erros.celular && (
                <span className="mensagem-erro">{erros.celular}</span>
              )}
            </div>
            <div className="campo">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail *"
                className={erros.email ? "erro" : ""}
              />
              {erros.email && (
                <span className="mensagem-erro">{erros.email}</span>
              )}
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                placeholder="Senha *"
                className={erros.senha ? "erro" : ""}
              />
              {erros.senha && (
                <span className="mensagem-erro">{erros.senha}</span>
              )}
            </div>
            <div className="campo">
              <input
                type="password"
                name="repetir_senha"
                value={form.repetir_senha}
                onChange={handleChange}
                placeholder="Repetir Senha *"
                className={erros.repetir_senha ? "erro" : ""}
              />
              {erros.repetir_senha && (
                <span className="mensagem-erro">{erros.repetir_senha}</span>
              )}
            </div>
          </div>

          <h3>Dados do Prescritor</h3>

          <div className="linha">
            <div className="campo">
              <select
                name="tipo"
                value={form.tipo}
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
                value={form.especialidade}
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
                value={form.numero_conselho}
                onChange={handleChange}
                placeholder="Número no Conselho Regional *"
                required
              />
            </div>

            <div className="campo">
              <select
                name="estado_conselho"
                value={form.estado_conselho}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Estado do Conselho *
                </option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </div>
          </div>

          <h3>Endereço de Atendimento</h3>

          <div className="linha">
            <div className="campo">
              <input
                name="cep"
                value={form.cep}
                onChange={handleChange}
                onBlur={buscarEndereco}
                placeholder="CEP *"
                className={erros.cep ? "erro" : ""}
              />
              {erros.cep && <span className="mensagem-erro">{erros.cep}</span>}
            </div>
            <div className="campo">
              <input
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
                placeholder="Bairro"
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <input
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                placeholder="Endereço"
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <input
                name="numero"
                value={form.numero}
                onChange={handleChange}
                placeholder="Número *"
                className={erros.numero ? "erro" : ""}
                required
              />
              {erros.numero && (
                <span className="mensagem-erro">{erros.numero}</span>
              )}
            </div>
            <div className="campo">
              <input
                name="complemento"
                value={form.complemento}
                onChange={handleChange}
                placeholder="Complemento"
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <input
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                placeholder="Cidade"
              />
            </div>
            <div className="campo">
              <input
                name="estado"
                value={form.estado}
                onChange={handleChange}
                placeholder="Estado"
              />
            </div>
          </div>

          <button type="submit" className="btn-submeter">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPrescritor;
