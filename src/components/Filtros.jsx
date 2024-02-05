import React from "react";

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtrar Gastos</label>
          <select
            id="categoria"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="">-- Todas las Categorias --</option>
            <option value="ahorro">ahorro</option>
            <option value="comida">comida</option>
            <option value="casa">casa</option>
            <option value="gastos">gastos</option>
            <option value="ocio">ocio</option>
            <option value="salud">salud</option>
            <option value="suscripciones">suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filtros;
