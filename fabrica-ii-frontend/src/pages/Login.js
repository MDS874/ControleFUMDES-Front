import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import "../styles/Login.css";
import exampleImage from "../imgs/logoUnifacvest.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", data.token);
      alert("Login bem-sucedido!");
      navigate("/home");
    } else {
      setErrorMessage(data.message || "Erro desconhecido");
    }
  };

  return (
    <div className="login-container">
        
      <form onSubmit={handleSubmit}>
        <img
          src={exampleImage}
          alt="Logo Unifacvest"
          align="center"
          style={{ width: "auto", height: "auto" }}
        />
        <h2 align="center">Login</h2>
        <div>
          <label htmlFor="username">CPF:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><p><button type="submit">Login</button>
           Não possui cadastro?{" "}
        <Link to="/register">Cadastre-se</Link>
      </p>
        
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default Login;
