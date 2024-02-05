import React, { useState } from "react";
import Message from "./Message";

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidoPresupuesto }) => {

    const [message, setMessage] = useState('');
    

    const handlePresupuesto = (e) => {
      e.preventDefault()

      if (!presupuesto || presupuesto <= 0) {
        setMessage("el presupesto no es valido")
        return 
      } 

      setMessage('')
      setIsValidoPresupuesto(true)
    }
    
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(Number(e.target.value)))}
            className="nuevo-presupuesto"
            placeholder="Añade tu presupuesto"
            type="number"
            name=""
            id=""
          />
        </div>
        <input type="submit" value="Añadir" />
        {message && <Message tipo="error">{message}</Message>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
