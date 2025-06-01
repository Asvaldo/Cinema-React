// src/pages/VendaIngressosPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { getFromLocalStorage, saveToLocalStorage } from '../services/localStorageService';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Botao from '../components/common/Botao';

const tipoPagamentoOptions = ["Cartão", "Pix", "Dinheiro"];

const formatDisplayDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  try {
    return new Date(dateTimeString).toLocaleString('pt-BR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  } catch (e) { return dateTimeString; }
};

const VendaIngressosPage = () => {
  const [sessoes, setSessoes] = useState([]);
  const [ingressos, setIngressos] = useState([]);
  const [formState, setFormState] = useState({
    sessaoId: '', 
    cliente: '',
    cpf: '',
    assento: '',
    pagamento: ''
  });

  const location = useLocation(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const sessoesSalvas = getFromLocalStorage('sessoes', []);
    setSessoes(sessoesSalvas);
    setIngressos(getFromLocalStorage('ingressos', []));

    const queryParams = new URLSearchParams(location.search);
    const sessaoIdFromQuery = queryParams.get('sessaoId');

    if (sessaoIdFromQuery !== null && sessaoIdFromQuery !== '' && sessoesSalvas[parseInt(sessaoIdFromQuery)]) {
      setFormState(prevState => ({
        ...prevState,
        sessaoId: sessaoIdFromQuery 
      }));
    }
  }, [location.search]); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.sessaoId === '' || formState.sessaoId === null) {
      alert('Por favor, selecione uma sessão.');
      return;
    }

    const novaVenda = {
      ...formState,
      sessaoId: parseInt(formState.sessaoId), //
      dataVenda: new Date().toISOString()
    };

    const ingressosAtualizados = [...ingressos, novaVenda];
    setIngressos(ingressosAtualizados);
    saveToLocalStorage('ingressos', ingressosAtualizados);

    alert("Venda registrada com sucesso!");
    setFormState({ 
      sessaoId: new URLSearchParams(location.search).get('sessaoId') || '', 
      cliente: '',
      cpf: '',
      assento: '',
      pagamento: ''
    });
  };

  const sessoesOptions = sessoes.map((sessao, index) => ({
    value: index.toString(), 
    label: `${sessao.filme} - ${formatDisplayDateTime(sessao.dataHora)} - Sala: ${sessao.sala}`
  }));

  const getSessaoDetailsForTable = (sessaoId) => {
    const sessao = sessoes[sessaoId];
    if (sessao) {
      return `${sessao.filme} - ${formatDisplayDateTime(sessao.dataHora)}`;
    }
    return 'Sessão não encontrada';
  };


  return (
    <>
      <h1 className="text-center mb-4">Venda de Ingressos</h1>

      <form onSubmit={handleSubmit} className="mx-auto bg-light p-4 rounded shadow-sm mb-5" style={{ maxWidth: '600px' }}>
        <Select
          id="sessaoId" 
          label="Sessão"
          value={formState.sessaoId}
          onChange={handleChange}
          options={sessoesOptions}
          required
          defaultOptionText="Selecione a Sessão"
        />
        <Input
          id="cliente"
          label="Nome do Cliente"
          value={formState.cliente}
          onChange={handleChange}
          required
        />
        <Input
          id="cpf"
          label="CPF"
          value={formState.cpf}
          onChange={handleChange}
          required // Adicionar máscara de CPF seria uma melhoria
        />
        <Input
          id="assento"
          label="Assento"
          placeholder="Ex: A10"
          value={formState.assento}
          onChange={handleChange}
          required
        />
        <Select
          id="pagamento"
          label="Tipo de Pagamento"
          value={formState.pagamento}
          onChange={handleChange}
          options={tipoPagamentoOptions}
          required
          defaultOptionText="Selecione o Pagamento"
        />
        <div className="mt-4">
          <Botao type="submit" variant="success" className="w-100" iconClass="bi bi-cart-check">
            Confirmar Venda
          </Botao>
        </div>
      </form>

      <h2 className="text-center mt-5 mb-3">Vendas Registradas</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped" id="vendas-tabela">
          <thead class="table-dark">
            <tr>
              <th>Cliente</th>
              <th>Assento</th>
              <th>Sessão</th>
              <th>Pagamento</th>
              <th>Data da Venda</th>
            </tr>
          </thead>
          <tbody>
            {ingressos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">Nenhuma venda registrada.</td>
              </tr>
            ) : (
              ingressos.map((venda, index) => (
                <tr key={index}> {}
                  <td>{venda.cliente}</td>
                  <td>{venda.assento}</td>
                  <td>{getSessaoDetailsForTable(venda.sessaoId)}</td>
                  <td>{venda.pagamento}</td>
                  <td>{formatDisplayDateTime(venda.dataVenda)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VendaIngressosPage;