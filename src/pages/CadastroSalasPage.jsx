// src/pages/CadastroSalasPage.jsx
import React, { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../services/localStorageService';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Botao from '../components/common/Botao';

const tiposSalaOptions = [
  "2D", "3D", "IMAX"
];

const CadastroSalasPage = () => {
  const [salas, setSalas] = useState([]);
  const [formState, setFormState] = useState({
    nomeSala: '',
    capacidade: '',
    tipo: ''
  });

  useEffect(() => {
    setSalas(getFromLocalStorage('salas', []));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [id]: value 
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newId = id;
    if (id === 'nomeSalaInput') newId = 'nomeSala'; 

    setFormState(prevState => ({
      ...prevState,
      [newId]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const novaSala = {
      nome: formState.nomeSala, 
      capacidade: formState.capacidade,
      tipo: formState.tipo
    };

    const salasAtualizadas = [...salas, novaSala];
    setSalas(salasAtualizadas);
    saveToLocalStorage('salas', salasAtualizadas);

    setFormState({
      nomeSala: '',
      capacidade: '',
      tipo: ''
    });
    alert('Sala salva com sucesso!');
  };

  return (
    <>
      <h1 className="text-center mb-4">Cadastro de Salas</h1>

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm mb-5">
        {}
        <Input
          id="nomeSala" 
          label="Nome da Sala"
          value={formState.nomeSala}
          onChange={handleChange} 
          required
        />
        <Input
          id="capacidade" 
          label="Capacidade"
          type="number"
          value={formState.capacidade}
          onChange={handleChange} 
          required
        />
        <Select
          id="tipo" 
          label="Tipo"
          value={formState.tipo}
          onChange={handleChange} 
          options={tiposSalaOptions}
          required
          defaultOptionText="Selecione o Tipo"
        />
        <div className="text-end mt-3">
          <Botao type="submit" variant="primary" iconClass="bi bi-save">
            Salvar Sala
          </Botao>
        </div>
      </form>

      <h2 className="mt-5 mb-3">Salas Cadastradas</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped" id="tabela-salas">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Capacidade</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {salas.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">Nenhuma sala cadastrada.</td>
              </tr>
            ) : (
              salas.map((sala, index) => (
                <tr key={index}>
                  <td>{sala.nome}</td>
                  <td>{sala.capacidade}</td>
                  <td>{sala.tipo}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CadastroSalasPage;
