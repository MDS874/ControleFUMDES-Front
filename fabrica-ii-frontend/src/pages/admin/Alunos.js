import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useTable } from 'react-table';

function Alunos() {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const response = await api.get('alunos/');
                setAlunos(response.data);
            } catch (error) {
                console.error("Erro ao buscar alunos:", error);
            }
        };

        fetchAlunos();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Nome",
                accessor: "nome",
            },
            {
                Header: "Curso",
                accessor: "curso",
            },
            {
                Header: "Horas Cumpridas",
                accessor: "horas_cumpridas",
            },
            {
                Header: "Horas Devidas",
                accessor: "horas_devidas",
            },
            
        ],
        []
    );

    const data = React.useMemo(() => alunos, [alunos]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
        });

    return (
        <div>
            <h2>Lista de Alunos</h2>
            <p>Visualize as informações detalhadas dos alunos cadastrados no sistema.</p>

            {alunos.length === 0 ? (
                <p>Nenhum aluno encontrado.</p>
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
        </div>
    );
}

export default Alunos;
