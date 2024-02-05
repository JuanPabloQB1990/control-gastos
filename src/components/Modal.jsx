import React, { useEffect, useState } from "react";
import CerrarBtn from "../img/cerrar.svg";
import Message from "./Message";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
      }
  }, []);

  const ocultarMdal = () => {
    setAnimarModal(false);
    setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setMessage("Todos los campos son obligatorios");
      return;
    }
    
    guardarGasto({ nombre, cantidad, categoria, id, fecha });
    setNombre("");
    setCantidad("");
    setCategoria("");
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarMdal} />
      </div>
      <form
        onSubmit={handleSumbit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {message && <Message tipo="error">{message}</Message>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">ahorro</option>
            <option value="comida">comida</option>
            <option value="casa">casa</option>
            <option value="gastos">gastos</option>
            <option value="ocio">ocio</option>
            <option value="salud">salud</option>
            <option value="suscripciones">suscripciones</option>
          </select>
        </div>
        <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}/>
      </form>
    </div>
  );
};

export default Modal;
