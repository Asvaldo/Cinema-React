// src/pages/CadastroSessoesPage.jsx
import React, { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../services/localStorageService';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Botao from '../components/common/Botao';

const idiomaOptions = ["Dublado", "Legendado"];
const formatoOptions = ["2D", "3D"];

const CadastroSessoesPage = () => {
  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [sessoes, setSessoes] = useState([]);

  const [formState, setFormState] = useState({
    filme: '',      
    sala: '',       
    dataHora: '',
    preco: '',
    idioma: '',
    formato: ''
  });

 
  useEffect(() => {
    setFilmes(getFromLocalStorage('filmes', []));
    setSalas(getFromLocalStorage('salas', []));
    setSessoes(getFromLocalStorage('sessoes', []));
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
    if (!formState.filme || !formState.sala) {
      alert('Por favor, selecione um filme e uma sala.');
      return;
    }
    const novaSessao = { ...formState };
    const sessoesAtualizadas = [...sessoes, novaSessao];
    setSessoes(sessoesAtualizadas);
    saveToLocalStorage('sessoes', sessoesAtualizadas);

    setFormState({
      filme: '', sala: '', dataHora: '', preco: '', idioma: '', formato: ''
    });
    alert('Sessão salva com sucesso!');
  };

  const formatDisplayDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      return new Date(dateTimeString).toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
      });
    } catch (e) {
      return dateTimeString;
    }
  };

  const formatCurrency = (value) => {
    const number = Number(value);
    if (isNaN(number)) return 'N/A';
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const filmeOptions = filmes.map(filme => ({ value: filme.titulo, label: filme.titulo }));
  const salaOptions = salas.map(sala => ({ value: sala.nome, label: sala.nome }));


  return (
    <>
      <h1 className="text-center mb-4">Cadastro de Sessões</h1>

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm mb-5">
        <Select
          id="filme"
          label="Filme"
          value={formState.filme}
          onChange={handleChange}
          options={filmeOptions} 
          required
          defaultOptionText="Selecione o Filme"
        />
        <Select
          id="sala"
          label="Sala"
          value={formState.sala}
          onChange={handleChange}
          options={salaOptions} 
          required
          defaultOptionText="Selecione a Sala"
        />
        <Input
          id="dataHora"
          label="Data e Hora"
          type="datetime-local"
          value={formState.dataHora}
          onChange={handleChange}
          required
        />
        <Input
          id="preco"
          label="Preço (R$)"
          type="number"
          step="0.01"
          value={formState.preco}
          onChange={handleChange}
          required
        />
        <Select
          id="idioma"
          label="Idioma"
          value={formState.idioma}
          onChange={handleChange}
          options={idiomaOptions}
          required
          defaultOptionText="Selecione o Idioma"
        />
        <Select
          id="formato"
          label="Formato"
          value={formState.formato}
          onChange={handleChange}
          options={formatoOptions}
          required
          defaultOptionText="Selecione o Formato"
        />
        <div className="text-end mt-3">
          <Botao type="submit" variant="primary" iconClass="bi bi-save">
            Salvar Sessão
          </Botao>
        </div>
      </form>

      <h2 className="mt-5 mb-3">Sessões Cadastradas</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped" id="tabela-sessoes">
          <thead className="table-dark">
            <tr>
              <th>Filme</th>
              <th>Sala</th>
              <th>Data e Hora</th>
              <th>Preço</th>
              <th>Idioma</th>
              <th>Formato</th>
            </tr>
          </thead>
          <tbody>
            {sessoes.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">Nenhuma sessão cadastrada.</td>
              </tr>
            ) : (
              sessoes.map((sessao, index) => (
                <tr key={index}> {}
                  <td>{sessao.filme}</td>
                  <td>{sessao.sala}</td>
                  <td>{formatDisplayDateTime(sessao.dataHora)}</td>
                  <td>{formatCurrency(sessao.preco)}</td>
                  <td>{sessao.idioma}</td>
                  <td>{sessao.formato}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CadastroSessoesPage;