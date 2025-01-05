import React, { useState } from "react";
import "./Registros.css"; // Asegúrate de que este archivo exista en la carpeta correcta

function Registros() {
  const [registros, setRegistros] = useState([]);
  const [fecha, setFecha] = useState("");
  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("Ingreso");  // Tipo de registro
  const [comentarios, setComentarios] = useState("");

  const agregarRegistro = () => {
    if (!fecha || !concepto || !monto) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const nuevoRegistro = { fecha, concepto, monto: parseFloat(monto), tipo, comentarios };
    setRegistros([...registros, nuevoRegistro]);

    // Limpiar los campos después de agregar
    setFecha("");
    setConcepto("");
    setMonto("");
    setTipo("Ingreso");
    setComentarios("");
  };

  const eliminarRegistro = (index) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este registro?");
    if (confirmDelete) {
      const nuevosRegistros = registros.filter((_, i) => i !== index);
      setRegistros(nuevosRegistros);
    }
  };

  return (
    <div className="registros-container">
      <h3>Registrar Registro Contable</h3>
      <div className="form-container">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Concepto"
          value={concepto}
          onChange={(e) => setConcepto(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="input-field"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="input-field"
        >
          <option value="Ingreso">Ingreso</option>
          <option value="Gasto">Gasto</option>
        </select>
        <textarea
          placeholder="Comentarios"
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          className="input-field"
        />
        <button onClick={agregarRegistro} className="button">
          Agregar Registro
        </button>
      </div>

      <h3>Lista de Registros Contables</h3>
      {registros.length === 0 ? (
        <p>No hay registros contables disponibles.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Tipo</th>
                <th>Comentarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro, index) => (
                <tr key={index}>
                  <td>{registro.fecha}</td>
                  <td>{registro.concepto}</td>
                  <td>{registro.monto.toFixed(2)}</td>
                  <td>{registro.tipo}</td>
                  <td>{registro.comentarios}</td>
                  <td>
                    <button onClick={() => eliminarRegistro(index)} className="button delete">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Registros;
