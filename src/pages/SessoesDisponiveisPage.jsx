// src/pages/SessoesDisponiveisPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getFromLocalStorage } from '../services/localStorageService';
import Botao from '../components/common/Botao'; 

const SessoesDisponiveisPage = () => {
  const [sessoes, setSessoes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const sessoesSalvas = getFromLocalStorage('sessoes', []);
    setSessoes(sessoesSalvas);
  }, []);

  const formatDisplayDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      return new Date(dateTimeString).toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
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

  const handleComprarIngresso = (sessaoIndex) => {
    navigate(`/venda-ingressos?sessaoId=${sessaoIndex}`);
  };

  return (
    <>
      <h1 className="text-center mb-4">Sessões Disponíveis</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light"> {}
            <tr>
              <th>Filme</th>
              <th>Sala</th>
              <th>Data e Hora</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="tabela-sessoes">
            {sessoes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">Nenhuma sessão disponível no momento.</td>
              </tr>
            ) : (
              sessoes.map((sessao, index) => (
                <tr key={index}> {}
                  <td>{sessao.filme}</td>
                  <td>{sessao.sala}</td>
                  <td>{formatDisplayDateTime(sessao.dataHora)}</td>
                  <td>{formatCurrency(sessao.preco)}</td>
                  <td>
                    <Botao
                      variant="primary"
                      size="sm" 
                      onClick={() => handleComprarIngresso(index)}
                      iconClass="bi bi-ticket-perforated"
                    >
                      Comprar Ingresso
                    </Botao>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SessoesDisponiveisPage;