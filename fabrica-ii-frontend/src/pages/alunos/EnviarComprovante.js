import React, { useState } from 'react';

const EnviarComprovante = () => {
  const [data, setData] = useState('');
  const [horasPrestadas, setHorasPrestadas] = useState('');
  const [local, setLocal] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [comprovante, setComprovante] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [idAluno, setIdAluno] = useState(1); // Defina o idAluno conforme necessário

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar os dados do formulário
    const formData = new FormData();
    formData.append('idAluno', idAluno);
    formData.append('data', data);
    formData.append('horas_prestadas', horasPrestadas);
    formData.append('local', local);
    formData.append('supervisor', supervisor);
    formData.append('comprovante', comprovante); // Corrigido para usar a variável 'comprovante'

    // Enviar a requisição POST
    const response = await fetch('http://localhost:8000/api/comprovantes/enviar_comprovante/', {
        method: 'POST',
        body: formData,
    });

    const dataResponse = await response.json();
    if (response.ok) {
        alert('Comprovante enviado com sucesso!');
    } else {
        alert(`Erro: ${dataResponse.message}`);
    }
};

  return (
    <div>
      <h2>Enviar Comprovante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Horas Prestadas</label>
          <input
            type="number"
            value={horasPrestadas}
            onChange={(e) => setHorasPrestadas(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Local</label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Supervisor</label>
          <input
            type="text"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Comprovante (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setComprovante(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default EnviarComprovante;
