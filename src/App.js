import React from 'react';
import './App.css';
import Clientes from './Components/Clientes';  // Importación sin la extensión .js (React maneja las extensiones por defecto)
import Registros from './Components/Registros'; 
import Reportes from './Components/Reportes'; 
import Dashboard from './Components/Dashboard'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión del Despacho Contable</h1>
      </header>
      
      <div className="content">
        <section>
          <h2>Clientes</h2>
          <Clientes />
        </section>

        <section>
          <h2>Registros Contables</h2>
          <Registros />
        </section>

        <section>
          <h2>Reportes</h2>
          <Reportes />
        </section>

        <section>
          <h2>Dashboard Financiero</h2>
          <Dashboard />
        </section>
      </div>
    </div>
  );
}

export default App;
