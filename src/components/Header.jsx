import React from "react";
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

const Header = ({
  presupuesto,
  setPresupuesto,
  isValidoPresupuesto,
  setIsValidoPresupuesto,
  gastos,
  setGastos
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidoPresupuesto ? (
        <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} setPresupuesto={setPresupuesto} setGastos={setGastos} setIsValidoPresupuesto={setIsValidoPresupuesto}/>
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidoPresupuesto={setIsValidoPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
