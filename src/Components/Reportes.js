import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./Reportes.css";

// Configuración de ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Reportes() {
  const [mostrarReporte, setMostrarReporte] = useState(false);
  const [ingresos, setIngresos] = useState(5000); // Ejemplo de ingresos
  const [egresos, setEgresos] = useState(2000); // Ejemplo de egresos
  const [ingresosMensuales, setIngresosMensuales] = useState([1000, 1200, 1300, 1500]); // Datos de ingresos por semana
  const [egresosMensuales, setEgresosMensuales] = useState([500, 600, 700, 800]); // Datos de egresos por semana

  const generarReporte = () => {
    setMostrarReporte(true);
  };

  // Datos para el gráfico de ingresos y egresos
  const data = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Ingresos",
        data: ingresosMensuales,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        fill: true,
      },
      {
        label: "Egresos",
        data: egresosMensuales,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: true,
      },
    ],
  };

  // Función para descargar los reportes en formato CSV
  const descargarCSV = () => {
    const headers = ["Concepto", "Monto", "Tipo"];
    const rows = [
      ["Ingreso", ingresos, "Ingreso"],
      ["Egreso", egresos, "Egreso"],
    ];

    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reporte_financiero.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Funciones para modificar ingresos y egresos
  const handleIngresoChange = (event) => {
    const nuevoIngreso = parseFloat(event.target.value);
    setIngresos(nuevoIngreso);
    // También se podría actualizar el gráfico o datos asociados si se quiere
  };

  const handleEgresoChange = (event) => {
    const nuevoEgreso = parseFloat(event.target.value);
    setEgresos(nuevoEgreso);
    // Igualmente se puede actualizar el gráfico si se necesita
  };

  const handleIngresoMensualChange = (index, event) => {
    const nuevosIngresos = [...ingresosMensuales];
    nuevosIngresos[index] = parseFloat(event.target.value);
    setIngresosMensuales(nuevosIngresos);
  };

  const handleEgresoMensualChange = (index, event) => {
    const nuevosEgresos = [...egresosMensuales];
    nuevosEgresos[index] = parseFloat(event.target.value);
    setEgresosMensuales(nuevosEgresos);
  };

  return (
    <div className="reportes-container">
      <h3>Reportes Financieros</h3>
      <p className="reportes-description">
        Visualiza y descarga los reportes financieros detallados de ingresos y egresos. Puedes generar gráficos para un análisis más completo.
      </p>

      <div className="buttons-container">
        <button onClick={generarReporte} className="button generate-report">Generar Reporte</button>
        <button onClick={descargarCSV} className="button download-report">Descargar CSV</button>
      </div>

      {mostrarReporte && (
        <div className="reportes-content">
          <div className="chart-container">
            <Line data={data} options={{ responsive: true, plugins: { title: { display: true, text: "Ingresos vs Egresos" } } }} />
          </div>

          <div className="financial-summary">
            <h4>Resumen Financiero</h4>

            {/* Modificar los ingresos y egresos generales */}
            <div className="summary-item">
              <span><strong>Ingresos:</strong></span>
              <input
                type="number"
                value={ingresos}
                onChange={handleIngresoChange}
                step="0.01"
                min="0"
                className="input-field"
              />
            </div>

            <div className="summary-item">
              <span><strong>Egresos:</strong></span>
              <input
                type="number"
                value={egresos}
                onChange={handleEgresoChange}
                step="0.01"
                min="0"
                className="input-field"
              />
            </div>

            {/* Modificar los ingresos y egresos mensuales */}
            <div className="weekly-summary">
              <h5>Ingresos Mensuales</h5>
              {ingresosMensuales.map((ingreso, index) => (
                <div className="weekly-item" key={index}>
                  <span><strong>Semana {index + 1}:</strong></span>
                  <input
                    type="number"
                    value={ingreso}
                    onChange={(event) => handleIngresoMensualChange(index, event)}
                    step="0.01"
                    min="0"
                    className="input-field"
                  />
                </div>
              ))}

              <h5>Egresos Mensuales</h5>
              {egresosMensuales.map((egreso, index) => (
                <div className="weekly-item" key={index}>
                  <span><strong>Semana {index + 1}:</strong></span>
                  <input
                    type="number"
                    value={egreso}
                    onChange={(event) => handleEgresoMensualChange(index, event)}
                    step="0.01"
                    min="0"
                    className="input-field"
                  />
                </div>
              ))}
            </div>

            {/* Resumen de estadísticas */}
            <div className="summary-item">
              <span><strong>Saldo Final:</strong></span>
              <span>${(ingresos - egresos).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span><strong>Promedio Ingresos:</strong></span>
              <span>${(ingresosMensuales.reduce((a, b) => a + b, 0) / ingresosMensuales.length).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span><strong>Promedio Egresos:</strong></span>
              <span>${(egresosMensuales.reduce((a, b) => a + b, 0) / egresosMensuales.length).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span><strong>Máximo Ingreso:</strong></span>
              <span>${Math.max(...ingresosMensuales)}</span>
            </div>
            <div className="summary-item">
              <span><strong>Máximo Egreso:</strong></span>
              <span>${Math.max(...egresosMensuales)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reportes;
