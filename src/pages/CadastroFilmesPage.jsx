// src/pages/CadastroFilmesPage.jsx
import React, { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../services/localStorageService';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Botao from '../components/common/Botao';
import Textarea from '../components/common/Textarea';

const generosOptions = [
  "Ação", "Comédia", "Drama", "Terror", "Ficção Científica", "Romance"
];

const classificacaoOptions = [
  "Livre", "10 anos", "12 anos", "14 anos", "16 anos", "18 anos"
];

const CadastroFilmesPage = () => {
  const [filmes, setFilmes] = useState([]);
  const [formState, setFormState] = useState({
    titulo: '',
    descricao: '',
    genero: '',
    classificacao: '',
    duracao: '',
    estreia: ''
  });

  useEffect(() => {
    setFilmes(getFromLocalStorage('filmes', []));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filmesAtualizados = [...filmes, formState];
    setFilmes(filmesAtualizados);
    saveToLocalStorage('filmes', filmesAtualizados);
    
    // Limpar formulário
    setFormState({
      titulo: '', descricao: '', genero: '', classificacao: '', duracao: '', estreia: ''
    });
    alert('Filme salvo com sucesso!');
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return ''; 
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (error) {
        return ''; 
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    } catch(e) {
        return dateString; 
    }
  };


  return (
    <>
      <h1 className="text-center mb-4">Cadastro de Filmes</h1>

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <Input
          id="titulo"
          label="Título"
          value={formState.titulo}
          onChange={handleChange}
          required
        />
        {}
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <textarea
            id="descricao"
            className="form-control"
            value={formState.descricao}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <Select
          id="genero"
          label="Gênero"
          value={formState.genero}
          onChange={handleChange}
          options={generosOptions}
          required
        />
        <Select
          id="classificacao"
          label="Classificação Indicativa"
          value={formState.classificacao}
          onChange={handleChange}
          options={classificacaoOptions}
          required
        />
        <Input
          id="duracao"
          label="Duração (min)"
          type="number"
          value={formState.duracao}
          onChange={handleChange}
          required
        />
        <Input
          id="estreia"
          label="Data de Estreia"
          type="date"
          value={formState.estreia} 
          onChange={handleChange}
          required
        />
        <div className="text-end">
          <Botao type="submit" variant="primary" iconClass="bi bi-save">
            Salvar Filme
          </Botao>
        </div>
      </form>

      <h2 className="mt-5 mb-3">Filmes Cadastrados</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Gênero</th>
              <th>Classificação</th>
              <th>Duração</th>
              <th>Estreia</th>
            </tr>
          </thead>
          <tbody>
            {filmes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">Nenhum filme cadastrado.</td>
              </tr>
            ) : (
              filmes.map((filme, index) => (
                <tr key={index}>
                  <td>{filme.titulo}</td>
                  <td>{filme.genero}</td>
                  <td>{filme.classificacao}</td>
                  <td>{filme.duracao} min</td>
                  <td>{formatDateForDisplay(filme.estreia)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CadastroFilmesPage;
