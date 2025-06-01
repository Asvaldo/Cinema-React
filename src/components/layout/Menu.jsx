import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const activeStyle = {
  fontWeight: 'bold',
  textDecoration: 'underline',
};

const Menu = () => {
  const navLinks = [
    { path: "/", text: "Início", exact: true }, // 'exact' para a página inicial
    { path: "/cadastro-filmes", text: "Cadastro de Filmes" },
    { path: "/cadastro-salas", text: "Cadastro de Salas" },
    { path: "/cadastro-sessoes", text: "Cadastro de Sessões" },
    { path: "/venda-ingressos", text: "Venda de Ingressos" },
    { path: "/sessoes-disponiveis", text: "Sessões Disponíveis" },
  ];

  return (
    <header className="bg-dark py-3 mb-4"> {}
      <nav className="container-fluid d-flex justify-content-start flex-wrap align-items-center w-100 px-3">
        {}
        <Link to="/" className="navbar-brand text-white me-4 ms-2 text-decoration-none fw-bold fs-4">
          CinePlay
        </Link>
        {navLinks.map((link) => (
          <NavLink
            key={link.text}
            to={link.path}
            className="text-white mx-3 text-decoration-none fw-bold"
            style={({ isActive }) => (isActive && link.exact ? activeStyle : isActive ? activeStyle : undefined)}
            end={link.exact} 
          >
            {link.text}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Menu;
