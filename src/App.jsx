import { useEffect, useState } from "react";
import Header from "./components/Header";
import IconNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import { generarId } from "./helpers/index.js";
import ListadoGastos from "./components/ListadoGastos.jsx";
import { object } from "prop-types";
import Filtros from "./components/Filtros.jsx";

function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) || 0);
  const [isValidoPresupuesto, setIsValidoPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) || []);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const handleNuevoGasto = () => {

    setModal(true);

    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);

  };

  useEffect(() => {
    localStorage.setItem('presupuesto', JSON.stringify(presupuesto ?? 0))
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLS > 0) {
      setIsValidoPresupuesto(true)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []) 
  }, [gastos]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  const guardarGasto = (gasto) => {
    
    if (gasto.id) {
      
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {

      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    
    const gastosFiltrados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosFiltrados)
  }
  
console.log(gastosFiltrados);
  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidoPresupuesto={isValidoPresupuesto}
        setIsValidoPresupuesto={setIsValidoPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />
      {isValidoPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro}/>
            <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro} gastosFiltrados={gastosFiltrados}/>
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
