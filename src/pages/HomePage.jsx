// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFromLocalStorage } from '../services/localStorageService';

const HomePage = () => {
  const [sessoes, setSessoes] = useState([]);

  useEffect(() => {
    setSessoes(getFromLocalStorage('sessoes', []));
  }, []);

  return (
    <div className="text-center">
      <h1 className="mb-4">🎬 CinePlay</h1>
      <p className="lead">Utilize o menu acima para navegar entre as funcionalidades.</p>

      {sessoes.length > 0 && (
        <div className="mt-5">
          <Link to="/sessoes-disponiveis" className="btn btn-primary btn-lg">
            Ver {sessoes.length} Sessão(ões) Disponível(is)
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
