import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Certifique-se de que o caminho do arquivo `api.js` está correto

function Alunos() {
    const [alunos, setAlunos] = useState([]);

    // Fetch de dados de alunos ao carregar o componente
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

    return (
        <div>
            <h1>Lista de Alunos</h1>
            <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>Horas Cumpridas</th>
                        <th>Horas Devidas</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.curso}</td>
                            <td>{aluno.horas_cumpridas}</td>
                            <td>{aluno.horas_devidas}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Alunos;
