import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function VerPlanetas() {
  const [data, setData] = useState(null);
  const [tipoBusqueda, setTipoBusqueda] = useState("planeta");
  const [valorBusqueda, setValorBusqueda] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/api";

  const getHeaders = () => ({
    Authorization: `Bearer ${user?.token}`,
    "Content-Type": "application/json",
  });

  const verTodo = async () => {
    try {
      const res = await fetch(`${API_URL}/planeta`, { headers: getHeaders() });
      const result = await res.json();
      setData(result);
    } catch (error) {
      alert("Error al obtener datos");
    }
  };

  const buscar = async () => {
    if (!valorBusqueda) return;
    try {
      const url = `${API_URL}/${tipoBusqueda}/${valorBusqueda}`;
      const res = await fetch(url, { headers: getHeaders() });
      const result = await res.json();
      setData(result);
    } catch (error) {
      alert("Error en la búsqueda");
    }
  };

  return (
    <div>
      <h2>Visualización de datos</h2>
      <div>
        <button onClick={verTodo}>Ver todo</button>
        <button onClick={() => navigate("/")}>Volver</button>
      </div>

      <hr />

      <div>
        <h4>Búsqueda individual</h4>
        <select
          value={tipoBusqueda}
          onChange={(e) => setTipoBusqueda(e.target.value)}
        >
          <option value="planeta">Planeta (idPlanet)</option>
          <option value="luna">Luna (idLuna)</option>
        </select>
        <input
          type="number"
          placeholder="ID"
          value={valorBusqueda}
          onChange={(e) => setValorBusqueda(e.target.value)}
        />
        <button onClick={buscar}>Buscar</button>
      </div>

      <hr />

      <pre style={{ background: "#f4f4f4", padding: "10px" }}>
        {data ? JSON.stringify(data, null, 2) : "No hay datos cargados"}
      </pre>
    </div>
  );
}

export default VerPlanetas;
