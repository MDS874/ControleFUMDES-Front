import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useTable } from "react-table";

function ConsultarExtrato() {
  const [comprovantes, setComprovantes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comentarios, setComentarios] = useState([]); // Armazenar comentários existentes
  const [selectedComprovanteId, setSelectedComprovanteId] = useState(null);

  useEffect(() => {
    const fetchComprovantes = async () => {
      try {
        console.log("Iniciando a busca de comprovantes...");
        const response = await api.get("comprovantes/listar_comprovantes/?nome_aluno=Maick de Souza");
        console.log("Resposta da API:", response.data); // Verificar dados retornados
        setComprovantes(response.data);
      } catch (error) {
        console.error("Erro ao buscar comprovantes:", error);
        alert("Erro ao carregar os comprovantes. Tente novamente mais tarde.");
      }
    };
    

    fetchComprovantes();
  }, []);

  // Abrir o PDF do comprovante
  const openModalPDF = async (id) => {
    try {
      const response = await api.get(`comprovantes/${id}/detalhes/`);
      const base64Data = response.data.comprovante;
      const blobUrl = URL.createObjectURL(
        new Blob([await (await fetch(`data:application/pdf;base64,${base64Data}`)).blob()], {
          type: "application/pdf",
        })
      );
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Erro ao carregar o comprovante:", error);
      alert("Não foi possível abrir o comprovante.");
    }
  };

  // Abrir o modal de comentários e carregar os comentários do comprovante selecionado
  const openComentarioModal = (id) => {
    const comprovante = comprovantes.find((comp) => comp.id === id);
    console.log("ID do comprovante selecionado:", id);
    console.log("Comprovantes carregados :", comprovantes);
    if (comprovante) {
      setComentarios(comprovante.comentarios || []); // Usa os comentários já carregados
      setSelectedComprovanteId(id);
      setIsModalOpen(true);
    } else {
      alert("Comprovante não encontrado!");
    }
  };

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchComprovantes = async () => {
    try {
      const response = await api.get("comprovantes/listar_comprovantes/?nome_aluno=Maick de Souza");
      setComprovantes(response.data);
    } catch (error) {
      console.error("Erro ao buscar comprovantes:", error);
      alert("Erro ao carregar os comprovantes. Tente novamente mais tarde.");
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  fetchComprovantes();
}, []);


  const closeModal = () => {
    setIsModalOpen(false);
    setComentarios([]);
  };

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Nome do Aluno", accessor: "nome_aluno" },
      { Header: "Data", accessor: "data" },
      { Header: "Horas Prestadas", accessor: "horas_prestadas" },
      { Header: "Local", accessor: "local" },
      { Header: "Supervisor", accessor: "supervisor" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (value === 0 ? "Pendente" : value === 1 ? "Aprovado" : "Reprovado"),
      },
      {
        Header: "Ações",
        Cell: ({ row }) => (
          <div className="table-actions">
            <button onClick={() => openModalPDF(row.original.id)} disabled={loading}>
  Ver Comprovante
</button>
<button onClick={() => openComentarioModal(row.original.id)} disabled={loading}>
  Visualizar
</button>

          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => comprovantes, [comprovantes]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="consultar-extrato">
      <h2>Solicitações em aberto</h2>
      <p>
        Aqui os administradores poderão consultar as solicitações em aberto e avaliar se as mesmas são
        válidas.
      </p>

      {comprovantes.length === 0 ? (
        <p>Nenhum comprovante encontrado.</p>
      ) : (
        <table {...getTableProps()} className="react-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal" aria-hidden={!isModalOpen}>
          <div className="modal-content">
            <h2>Comentários</h2>
            {comentarios.length === 0 ? (
              <p>Não há comentários para este comprovante.</p>
            ) : (
              <ul>
                {comentarios.map((comentario, index) => (
                  <li key={index}>
                    <p>{comentario.comentario}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="modal-buttons">
              <button onClick={closeModal}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultarExtrato;
