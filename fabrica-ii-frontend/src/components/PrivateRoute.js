import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Verifica se há token armazenado

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;