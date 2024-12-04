import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { pdfjs } from "react-pdf";

// Caminho correto para o worker com base na versão atual do pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf-workers/pdf.worker.min.js`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Medir performance da aplicação
reportWebVitals();
