import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import banner from "../assets/banner.jpeg";
import imagemSobre from "../assets/sobre_nos.png";
import imagemProdutos from "../assets/produtos.png";
import { FiHelpCircle } from "react-icons/fi";
import FeedbackCarousel from "../components/FeedbackCarousel";
// import FeedbackCarousel from "../components/FeedbackCarousel";
import "../styles/home.css";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [faqAtivo, setFaqAtivo] = useState(null);

  const toggleResposta = (index) => {
    setFaqAtivo(faqAtivo === index ? null : index);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blog")
      .then((res) => {
        const ultimosTres = res.data.posts.slice(0, 3);
        setPosts(ultimosTres);
      })
      .catch((err) => {
        console.error("Erro ao buscar posts:", err);
      });
  }, []);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");

    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      {/* Banner */}
      <section className="secao-banner-parallax" id="banner"></section>

      {/* Seção Sobre Nós */}
      <section className="secao-sobre" id="sobrenos">
        <div className="conteudo-sobre">
          <div className="texto-sobre">
            <h2>Sobre Nós</h2>
            <p>
              Na Avivia, unimos ciência e empatia para transformar o cuidado em
              saúde. Nosso propósito é facilitar o acesso dos pacientes à
              cannabis medicinal, oferecendo tratamentos seguros, eficazes e
              financeiramente acessíveis. Acreditamos que informação de
              qualidade é essencial, por isso também promovemos a educação
              médica e capacitamos profissionais de saúde a prescrever com
              responsabilidade e confiança. Mais do que soluções, entregamos
              acolhimento, orientação e um compromisso genuíno com o bem-estar
              de cada pessoa.
            </p>
          </div>
          <div className="imagem-sobre">
            <img src={imagemSobre} alt="Ilustração sobre a Avivia" />
          </div>
        </div>
      </section>

      {/* Seção Últimos Posts do Blog */}
      <section className="secao-blog" id="blog">
        <h2>Últimos Artigos do Blog</h2>
        <div className="cards-blog">
          {posts.map((post) => (
            <div className="card-blog" key={post.id}>
              <img
                src={post.imagem_url}
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
              <a href={`/blog/${post.id}`} className="botao-blog">
                Ler mais
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Seção Acesso */}
      <section className="secao-acesso">
        <div className="card-acesso paciente">
          <div className="conteudo-card">
            <h3>Pacientes</h3>
            <a
              href="https://api.whatsapp.com/message/RWOGXBD4ZXASP1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="botao-acesso"
            >
              Entrar em Contato
            </a>
          </div>
        </div>
        <div className="card-acesso prescritor">
          <div className="conteudo-card">
            <h3>Prescritores</h3>
            <a href="/area-prescritor" className="botao-acesso preenchimento">
              Acessar
            </a>
          </div>
        </div>
      </section>

      {/* Seção Produtos */}
      <section className="secao-sobre">
        <div className="conteudo-sobre">
          <div className="texto-sobre">
            <h2>Nossos Produtos</h2>
            <p>
              Na Avivia, nossos produtos são fabricados com forte ênfase na
              qualidade e segurança. Aderimos às Boas Práticas de Fabricação
              (GMP), garantindo que cada formulação atenda aos mais altos
              padrões da indústria. Cada lote passa por testes rigorosos
              garantindo resultados consistentes e confiáveis.
            </p>
            <a href="/certificados" className="botao-produtos">
              Ver Certificados de Análise
            </a>
          </div>
          <div className="imagem-sobre">
            <img src={imagemProdutos} alt="Produtos da Avivia" />
          </div>
        </div>
      </section>

      {/*  */}

      <FeedbackCarousel />

      <section className="secao-faq" id="faq">
        <h2>Dúvidas Frequentes</h2>
        {[
          {
            pergunta: "O que são produtos à base de cannabis?",
            resposta:
              "O extrato vegetal é derivado da planta Cannabis sativa, contendo uma combinação de substâncias dessa planta. É reconhecido por preservar os componentes ativos das plantas, por sua longa durabilidade e efeitos revitalizantes à saúde, sendo uma ótima alternativa no tratamento de diversos sintomas.",
          },
          {
            pergunta: "O que é CDB?",
            resposta:
              "O canabidiol, ou CBD, é um dos canabinoides presentes na cannabis, sendo o principal agente terapêutico. Ajuda a tratar vários sintomas e condições, incluindo epilepsia, ansiedade, dor, inflamação e problemas do sistema imunológico.",
          },
          {
            pergunta: "O que é THC?",
            resposta:
              "O tetrahidrocanabinol, ou THC, é um dos principais canabinoides presentes na cannabis, conhecido pelos seus efeitos terapêuticos. Tem sido usado para tratar uma variedade de condições, incluindo dor crônica, náuseas e vômitos relacionados à quimioterapia, espasticidade em pacientes com esclerose múltipla e para estimular o apetite em pacientes submetidos à quimioterapia.",
          },
          {
            pergunta: "O que são canabinóides?",
            resposta:
              "Os canabinóides são substâncias químicas que interagem com o nosso sistema endocanabinóide. Existem três tipos principais:\n\n- Fitocanabinóides: derivados de plantas\n- Endocanabinóides: produzidos pelo corpo humano\n- Canabinóides sintéticos: fabricados em laboratório",
          },
          {
            pergunta: "Qual é o sistema endocanabinóide?",
            resposta:
              "O sistema endocanabinóide é um regulador essencial dos sistemas nervoso, imunológico e endócrino, sendo responsável por regular a homeostase do organismo. Pequenos receptores endocanabinoides estão distribuídos por todo o corpo e enviam e recebem mensagens químicas que regulam a dor, a inflamação, as funções imunológicas, entre outras.",
          },
          {
            pergunta: "Quais canabinóides o nosso corpo produz?",
            resposta:
              "Nosso corpo produz dois endocanabinóides principais: anandamida e 2-AG. A planta cannabis possui mais de 150 fitocanabinóides, embora existam milhares de canabinóides sintéticos.",
          },
          {
            pergunta: "Qual é a dosagem ideal?",
            resposta:
              "Fatores como peso, metabolismo e genética influenciam a dose ideal de CBD para cada pessoa. Como o sistema endocanabinóide é único, alguns indivíduos necessitam de pequenas doses, enquanto outros podem necessitar de doses maiores para alcançar o mesmo efeito. O apoio profissional é essencial.",
          },
          {
            pergunta:
              "Qual é a diferença entre óleos CBD Full Spectrum e óleos isolados de CBD?",
            resposta:
              "Oferecemos óleos Full Spectrum e CBD isolado. No CBD isolado não existem outros componentes vegetais, apenas CBD. O CBD Full Spectrum mantém todos os compostos naturais da planta, incluindo outros canabinóides, terpenos e flavonoides, proporcionando um efeito potencializado devido à sinergia entre estes componentes, conhecido como “efeito entourage”.",
          },
          {
            pergunta: "O que é melhor: óleo Full Spectrum ou isolado?",
            resposta:
              "Os óleos Full Spectrum mantêm o perfil natural dos compostos da planta de cannabis, incluindo canabinóides como CBG, CBC e CBN, e terpenos como pineno, linalol e limoneno. Muitas vezes são vistos como mais benéficos do que os isolados devido ao conhecido “efeito entourage”. Porém, como cada paciente possui características específicas, não existe uma forma ideal para todos, mas sim a que melhor se adapta à sua realidade (de acordo com a avaliação do prescritor).",
          },
          {
            pergunta: "Existem reações adversas?",
            resposta:
              "Os canabinóides são considerados seguros, mas podem apresentar efeitos adversos leves, que variam dependendo dos componentes principais. O profissional médico deve informar o paciente sobre possíveis adversidades no tratamento.",
          },
          {
            pergunta: "O CBD interage com outros medicamentos?",
            resposta:
              "O CBD é geralmente seguro, com baixo potencial para interações medicamentosas. Porém, pode interagir com medicamentos processados pelo fígado, que metaboliza muitos compostos, inclusive os naturais.",
          },
        ].map((item, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-pergunta" onClick={() => toggleResposta(index)}>
              <FiHelpCircle className="faq-icon" />
              <p>{item.pergunta}</p>
              <span className="faq-seta">{faqAtivo === index ? "▲" : "▼"}</span>
            </div>
            <div
              className={`faq-resposta ${faqAtivo === index ? "aberta" : ""}`}
            >
              <p style={{ whiteSpace: "pre-line" }}>{item.resposta}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
