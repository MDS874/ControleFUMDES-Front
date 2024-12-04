import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: username,
                password: password,
            });

            // Armazenar o token de acesso no localStorage ou em um estado global
            localStorage.setItem('access_token', response.data.access);

            // Redireciona para a página principal após login bem-sucedido
            history.push('/');
        } catch (err) {
            setError('Usuário ou senha inválidos');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuário:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
