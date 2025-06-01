// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/layout/Menu';
import HomePage from './pages/HomePage';
import CadastroFilmesPage from './pages/CadastroFilmesPage';
import CadastroSalasPage from './pages/CadastroSalasPage';
import CadastroSessoesPage from './pages/CadastroSessoesPage';
import VendaIngressosPage from './pages/VendaIngressosPage';
import SessoesDisponiveisPage from './pages/SessoesDisponiveisPage';

function App() {
  return (
    <Router>
      <Menu />
      <main className="container my-4"> {}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadastro-filmes" element={<CadastroFilmesPage />} />
          <Route path="/cadastro-salas" element={<CadastroSalasPage />} />
          <Route path="/cadastro-sessoes" element={<CadastroSessoesPage />} />
          <Route path="/venda-ingressos" element={<VendaIngressosPage />} />
          <Route path="/sessoes-disponiveis" element={<SessoesDisponiveisPage />} />
          {}
        </Routes>
      </main>
      {}
    </Router>
  );
}

export default App;