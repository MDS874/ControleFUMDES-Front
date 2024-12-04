import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  // Componente da Home
import Alunos from './pages/Alunos';  // Componente dos Alunos
import Register from './pages/Register';  // Componente de Registro
import Login from './pages/Login';  // Componente de Registro


function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/alunos" element={<Alunos />} />
                <Route path="/register" element={<Register />} /> {/* Rota para a tela de Registro */}
                <Route path="/login" element={<Login />} /> {/* Rota para a tela de Login */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
