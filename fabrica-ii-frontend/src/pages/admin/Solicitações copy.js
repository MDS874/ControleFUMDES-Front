import React, { useEffect, useState } from "react";
import api from "../../services/api"; // Certifique-se de que o caminho do arquivo `api.js` está correto
import { Document, Page } from "react-pdf"; // Biblioteca para renderizar o PDF

function ConsultarExtrato() {
  const [comprovantes, setComprovantes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfData, setPdfData] = useState(null);

  // Função para converter Base64 para Blob
  const base64toBlob = (data) => {
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);
    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }
    return new Blob([out], { type: 'application/pdf' });
  };

  // Fetch de dados de comprovantes ao carregar o componente
  useEffect(() => {
    const fetchComprovantes = async () => {
      try {
        const response = await api.get("comprovantes/listar_comprovantes/");
        setComprovantes(response.data);
      } catch (error) {
        console.error("Erro ao buscar comprovantes:", error);
      }
    };

    fetchComprovantes();
  }, []);

  // Função para abrir o modal e carregar o PDF
  const openModal = async (id) => {
    try {
      const response = await api.get(`comprovantes/${id}/detalhes/`);
      const base64Data = response.data.comprovante; // Base64 do PDF vindo da API
      const blob = base64toBlob(base64Data); // Converte para Blob
      const url = URL.createObjectURL(blob); // Cria uma URL temporária para o Blob
      setPdfData(url); // Atribui a URL ao estado
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao carregar os dados do comprovante:", error);
    }
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setPdfData(null);
  };

  return (
    <div>
      <h2>Solicitações em aberto</h2>
      <p>
        Aqui os administradores poderão consultar as solicitações em aberto e
        avaliar se as mesmas são válidas.
      </p>

      {comprovantes.length === 0 ? (
        <p>Nenhum comprovante encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Horas Prestadas</th>
              <th>Local</th>
              <th>Supervisor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {comprovantes.map((comprovante) => (
              <tr key={comprovante.id}>
                <td>{comprovante.id}</td>
                <td>{comprovante.data}</td>
                <td>{comprovante.horas_prestadas}</td>
                <td>{comprovante.local}</td>
                <td>{comprovante.supervisor}</td>
                <td>
                  {comprovante.status === 0
                    ? "Pendente"
                    : comprovante.status === 1
                    ? "Aprovado"
                    : "Reprovado"}
                </td>
                <td>
                  <button onClick={() => openModal(comprovante.id)}>
                    Ver Comprovante
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Comprovante</h3>

            {/* Renderizar o PDF */}
            <div>
              <h4>Arquivo PDF</h4>
              {pdfData ? (
                <Document file={pdfData}>
                  <Page pageNumber={1} />
                </Document>
              ) : (
                <p>Carregando o PDF...</p>
              )}
            </div>

            <div>
              <button onClick={closeModal}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultarExtrato;
