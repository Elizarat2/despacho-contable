import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import './Dashboard.css';

// Registro de los componentes del gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [ingresos, setIngresos] = useState(5000);
  const [egresos, setEgresos] = useState(3000);

  // Configuración de los datos del gráfico
  const data = {
    labels: ["Ingreso", "Egreso"],
    datasets: [
      {
        label: "Finanzas",
        data: [ingresos, egresos],
        backgroundColor: ["rgba(0, 255, 0, 0.6)", "rgba(255, 0, 0, 0.6)"], // Colores para las barras
        borderColor: ["green", "red"],

      },
    ],
  };

  // Configuración de opciones para personalizar el gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Reporte Financiero: Ingresos vs Egresos",
      },
    },
  };

  const handleIngresosChange = (event) => {
    setIngresos(Number(event.target.value));
  };

  const handleEgresosChange = (event) => {
    setEgresos(Number(event.target.value));
  };

  return (
    <div className="dashboard-container">
      <h3>Dashboard Financiero</h3>
      <p>Visualiza y controla los datos financieros clave.</p>

      <div className="financial-summary">
        <div className="summary-item">
          <h4>Total Ingresos: ${ingresos}</h4>
          <input
            type="number"
            value={ingresos}
            onChange={handleIngresosChange}
            placeholder="Modificar Ingresos"
          />
        </div>
        <div className="summary-item">
          <h4>Total Egresos: ${egresos}</h4>
          <input
            type="number"
            value={egresos}
            onChange={handleEgresosChange}
            placeholder="Modificar Egresos"
          />
        </div>
        <div className="summary-item">
          <h4>Balance: ${(ingresos - egresos).toFixed(2)}</h4>
        </div>
      </div>

      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Dashboard;
