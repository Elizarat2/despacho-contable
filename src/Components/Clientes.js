import React, { useState } from "react";
import './Clientes.css'; // Asegúrate de tener este archivo de estilos

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Para rastrear cuál cliente está siendo editado
  const [editNombre, setEditNombre] = useState(""); // Nombre a editar

  const agregarCliente = () => {
    if (!nombre || !email) {
      alert("Por favor ingrese todos los datos.");
      return;
    }
    setClientes([...clientes, { nombre, email }]);
    setNombre("");
    setEmail("");
  };

  const editarCliente = (index) => {
    setEditIndex(index);
    setEditNombre(clientes[index].nombre);
  };

  const guardarEdicion = (index) => {
    const nuevosClientes = [...clientes];
    nuevosClientes[index].nombre = editNombre;
    setClientes(nuevosClientes);
    setEditIndex(null);
    setEditNombre("");
  };

  const eliminarCliente = (index) => {
    const nuevosClientes = clientes.filter((cliente, i) => i !== index);
    setClientes(nuevosClientes);
  };

  return (
    <div className="clientes-container">
      <h3 className="title">Registrar Cliente</h3>
      <div className="form-container">
        <input 
          type="text" 
          placeholder="Nombre del cliente"
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          className="input-field"
        />
        <input 
          type="email" 
          placeholder="Correo electrónico"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="input-field"
        />
        <button onClick={agregarCliente} className="add-button">Agregar Cliente</button>
      </div>

      <h3 className="title">Lista de Clientes</h3>
      <ul className="clientes-list">
        {clientes.map((cliente, index) => (
          <li key={index} className="cliente-item">
            {editIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  className="input-field"
                />
                <button onClick={() => guardarEdicion(index)} className="save-button">
                  Guardar
                </button>
              </div>
            ) : (
              <div className="client-info">
                <span onClick={() => editarCliente(index)} className="editable-name">
                  {cliente.nombre}
                </span>
                <span>{cliente.email}</span>
                <button onClick={() => eliminarCliente(index)} className="delete-button">
                  Eliminar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
