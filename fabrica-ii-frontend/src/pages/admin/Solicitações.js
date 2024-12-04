import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useTable } from "react-table";

function ConsultarExtrato() {
  const [comprovantes, setComprovantes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comentario, setComentario] = useState("");
  const [selectedComprovanteId, setSelectedComprovanteId] = useState(null);

  useEffect(() => {
    const fetchComprovantes = async () => {
      try {
        const response = await api.get("comprovantes/listar_comprovantes/");
        setComprovantes(response.data);
      } catch (error) {
        console.error("Erro ao buscar comprovantes:", error);
        alert("Erro ao carregar os comprovantes. Tente novamente mais tarde.");
      }
    };

    fetchComprovantes();
  }, []);

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

  const openComentarioModal = (id) => {
    setSelectedComprovanteId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setComentario("");
  };

  const handleComentarioChange = (event) => setComentario(event.target.value);

  const handleEnviarComentario = async (status) => {
    if (status === 2 && !comentario.trim()) {
      alert("Não é possível rejeitar sem comentário.");
      return;
    }

    const comentarioFinal = status === 1 && !comentario.trim() ? "Comprovante aprovado" : comentario;

    try {
      await api.post("/comprovantes/comentar/", {
        id_comprovante: selectedComprovanteId,
        comentario: comentarioFinal,
        status,
      });

      alert(status === 1 ? "Comprovante aprovado!" : "Comprovante rejeitado!");
      closeModal();

      const response = await api.get("comprovantes/listar_comprovantes/");
      setComprovantes(response.data);
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      alert("Ocorreu um erro ao salvar o comentário. Tente novamente.");
    }
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
            <button onClick={() => openModalPDF(row.original.id)}>Ver Comprovante</button>
            <button
              onClick={() => openComentarioModal(row.original.id)}
              className={row.original.status === 1 ? "button-disabled" : ""}
              disabled={row.original.status === 1}
            >
              Adicionar Comentário
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
            <h2>Adicionar Comentário</h2>
            <textarea
              value={comentario}
              onChange={handleComentarioChange}
              placeholder="Escreva seu comentário aqui..."
              rows="4"
              cols="50"
            ></textarea>
            <div className="modal-buttons">
              <button onClick={() => handleEnviarComentario(1)} className="button-aprovar">
                Aprovar
              </button>
              <button onClick={() => handleEnviarComentario(2)} className="button-rejeitar">
                Rejeitar
              </button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultarExtrato;
