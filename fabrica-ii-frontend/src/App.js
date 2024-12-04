import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import EnviarComprovante from './pages/alunos/EnviarComprovante'; // Tela de Enviar Comprovante
import ConsultarExtrato from './pages/alunos/ConsultarExtrato'; // Tela de Consultar Extrato
import GerenciarAlunos from './pages/admin/Alunos'; // Tela de Alunos para Administradores
import Solicitações from './pages/admin/Solicitações'; // Tela de Solicitações
import Sidebar from './components/Sidebar'; // Importa o Sidebar
import './App.css'; // Certifique-se de que o caminho está correto

// Componente de Layout com Sidebar (para rotas autenticadas)
const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar /> {/* Sidebar fixo */}
      <div className="app-content">
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
};

// Componente para verificar autenticação
const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Verifica se o token existe
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redireciona para login */}

        {/* Rotas protegidas (com layout e autenticação) */}
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={
                <AuthenticatedLayout>
                  <Home />
                </AuthenticatedLayout>
              }
            />
          }
        />
        <Route
          path="/alunos/enviar-comprovante"
          element={
            <PrivateRoute
              element={
                <AuthenticatedLayout>
                  <EnviarComprovante />
                </AuthenticatedLayout>
              }
            />
          }
        />
        <Route
          path="/alunos/consultar-extrato"
          element={
            <PrivateRoute
              element={
                <AuthenticatedLayout>
                  <ConsultarExtrato />
                </AuthenticatedLayout>
              }
            />
          }
        />
        <Route
          path="/admin/alunos"
          element={
            <PrivateRoute
              element={
                <AuthenticatedLayout>
                  <GerenciarAlunos />
                </AuthenticatedLayout>
              }
            />
          }
        />
        <Route
          path="/admin/solicitacoes"
          element={
            <PrivateRoute
              element={
                <AuthenticatedLayout>
                  <Solicitações />
                </AuthenticatedLayout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
