import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import WhatsAppButton from "./components/whatsappButton";
import AcessoPrescritor from "./pages/acessoPrescritor";
import CadastroPrescritor from "./pages/cadastroPrescritor";
import LoginPrescritor from "./pages/loginPrescritor";
import EsqueciSenha from "./pages/esqueciSenha";
import AreaPrescritor from "./pages/areaPrescritor";
import EstudosCientificos from "./pages/estudosCientificos";
import Ebooks from "./pages/ebooks";
import Certificados from "./pages/certificados";
import Blog from "./pages/blog";
import Home from "./pages/home";
import PostIndividual from "./pages/postIndividual";
import EstudosPorPatologia from "./pages/estudosPorPatologia";
import MeusEbooks from "./pages/meusEbooks";
import LoginAdmin from "./pages/loginAdmin";
import RotaProtegidaAdmin from "./components/RotaProtegidaAdmin";
import RotaProtegidaPrescritor from "./components/RotaProtegidaPrescritor";
import PainelAdmin from "./pages/painelAdmin";
import MeusEstudos from "./pages/meusEstudos";
import MeusPatologias from "./pages/meusPatologias";
import MeusBlogs from "./pages/meusBlogs";
import MeusCertificados from "./pages/meusCertificados";
import FeedbackAdmin from "./pages/admin/FeedbackAdmin";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <main className="conteudo-principal">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<div>Sobre Nós</div>} />
            <Route path="/acesso-prescritor" element={<AcessoPrescritor />} />
            <Route
              path="/cadastro-prescritor"
              element={<CadastroPrescritor />}
            />
            <Route path="/login-prescritor" element={<LoginPrescritor />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />

            <Route
              path="/area-prescritor"
              element={
                <RotaProtegidaPrescritor>
                  <AreaPrescritor />
                </RotaProtegidaPrescritor>
              }
            />

            <Route
              path="/estudos-cientificos"
              element={
                <RotaProtegidaPrescritor>
                  <EstudosCientificos />
                </RotaProtegidaPrescritor>
              }
            />

            <Route
              path="/ebooks"
              element={
                <RotaProtegidaPrescritor>
                  <Ebooks />
                </RotaProtegidaPrescritor>
              }
            />

            <Route path="/certificados" element={<Certificados />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<PostIndividual />} />

            <Route
              path="/estudos/:id"
              element={
                <RotaProtegidaPrescritor>
                  <EstudosPorPatologia />
                </RotaProtegidaPrescritor>
              }
            />

            <Route
              path="/meus-ebooks"
              element={
                <RotaProtegidaAdmin>
                  <MeusEbooks />
                </RotaProtegidaAdmin>
              }
            />

            <Route
              path="/meus-estudos"
              element={
                <RotaProtegidaAdmin>
                  <MeusEstudos />
                </RotaProtegidaAdmin>
              }
            />
            <Route
              path="/meus-patologias"
              element={
                <RotaProtegidaAdmin>
                  <MeusPatologias />
                </RotaProtegidaAdmin>
              }
            />
            <Route
              path="/meus-blogs"
              element={
                <RotaProtegidaAdmin>
                  <MeusBlogs />
                </RotaProtegidaAdmin>
              }
            />
            <Route
              path="/meus-certificados"
              element={
                <RotaProtegidaAdmin>
                  <MeusCertificados />
                </RotaProtegidaAdmin>
              }
            />
            <Route
              path="/admin/meus-feedbacks"
              element={
                <RotaProtegidaAdmin>
                  <FeedbackAdmin /> {/* tela que já criamos */}
                </RotaProtegidaAdmin>
              }
            />
            <Route path="/admin" element={<LoginAdmin />} />
            <Route
              path="/admin/painel"
              element={
                <RotaProtegidaAdmin>
                  <PainelAdmin />
                </RotaProtegidaAdmin>
              }
            />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </Router>
    </div>
  );
}

export default App;
