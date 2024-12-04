import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"; 
import axios from 'axios';
import "../styles/Login.css";
import exampleImage from "../imgs/logoUnifacvest.png";

const Register = () => {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      nome,
      matricula,
      cpf,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8000/user/register/', userData);
      setSuccessMessage(response.data.message);
      setError('');
    } catch (err) {
      setError('Erro ao criar usuário. Tente novamente.');
      setSuccessMessage('');
    }
  };

  
  return (
    <div className="login-container">
    <div>
      
      <form onSubmit={handleSubmit}>
      <img
          src={exampleImage}
          alt="Logo Unifacvest"
          align="center"
          style={{ width: "auto", height: "auto" }}
        />
      <h2 align="center">Cadastrar-se</h2>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Matrícula</label>
          <input
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p><button type="submit">Cadastrar</button>
        Já possui cadastro?{" "}
        <Link to="/login">Login</Link> 
      </p>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
    </div>
    </div>
  );
};

export default Register;
