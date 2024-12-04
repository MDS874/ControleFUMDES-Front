import React from 'react';
import exampleImage from "../imgs/logoUnifacvest.png";

function Home() {
  return (
    <div align="center" justify-content='center' className='home'>
      <img
          src={exampleImage}
          alt="Logo Unifacvest"
          align="center"
          style={{ width: "auto", height: "auto" }}
        />
      <h1 aling="center">Seja bem-vindo ao sistema de controle de horas do programa de bolsas do FUMDES</h1>
    </div>
  );
}

export default Home;