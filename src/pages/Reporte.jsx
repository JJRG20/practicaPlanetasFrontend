import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Reporte() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    minDiameter: "",
    maxDiameter: "",
    minWeight: "",
    maxWeight: "",
    minSunDist: "",
    maxSunDist: "",
    minTime: "",
    maxTime: "",
    minLunas: "",
    maxLunas: "",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.id]: e.target.value });
  };

  const generarReporte = async () => {
    const params = new URLSearchParams();

    // Agregar solo los filtros que tengan valor
    Object.keys(filtros).forEach((key) => {
      if (filtros[key]) params.append(key, filtros[key]);
    });

    try {
      const res = await fetch(
        `${API_URL}/astro/planetas/report?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setResultado(data);
      } else {
        const data = await res.json();
        setResultado("Error: " + (data.message || "No se pudo generar el reporte"));
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <div>
      <h2>Reporte de Planetas</h2>

      <div>
        <h4>Filtros</h4>

        <label>Diámetro (Km): desde </label>
        <input
          type="number"
          id="minDiameter"
          value={filtros.minDiameter}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxDiameter"
          value={filtros.maxDiameter}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Masa (Ton): desde </label>
        <input
          type="number"
          id="minWeight"
          value={filtros.minWeight}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxWeight"
          value={filtros.maxWeight}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Distancia Sol (Km): desde </label>
        <input
          type="number"
          id="minSunDist"
          value={filtros.minSunDist}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxSunDist"
          value={filtros.maxSunDist}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Días de órbita: desde </label>
        <input
          type="number"
          id="minTime"
          value={filtros.minTime}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxTime"
          value={filtros.maxTime}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Cantidad de lunas: desde </label>
        <input
          type="number"
          id="minLunas"
          value={filtros.minLunas}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxLunas"
          value={filtros.maxLunas}
          onChange={handleChange}
        />
        <br />
        <br />

        <button onClick={generarReporte}>Generar reporte</button>
        <button onClick={() => navigate("/")}>Volver</button>
      </div>

      <hr />

      <pre style={{ background: "#f4f4f4", padding: "10px" }}>
        {resultado
          ? JSON.stringify(resultado, null, 2)
          : "Complete los filtros y genere el reporte"}
      </pre>
    </div>
  );
}

export default Reporte;
