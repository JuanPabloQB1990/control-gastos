import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setPresupuesto,
  setGastos,
  setIsValidoPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  const formatearPresupuesto = (valor) => {
    return valor.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1200);
    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  const handleResetearApp = () => {
    const respuesta = confirm("deseas reiniciar el presupuesto y gastos?");
    if (respuesta) {
      setPresupuesto(0);
      setGastos([]);
      setIsValidoPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#dc2626" : "#3b82f6",
            trailColor: "#f5f5f5",
            pathTransitionDuration: 3.5,
            textColor: "#3b82f6",
          })}
        />
      </div>
      <div className="contenido-presupuesto">
        <button onClick={() => handleResetearApp()} className="reset-app">
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatearPresupuesto(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {formatearPresupuesto(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearPresupuesto(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
