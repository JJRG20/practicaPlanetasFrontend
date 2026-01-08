import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Reporte() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    mindiameter: "",
    maxdiameter: "",
    minweight: "",
    maxweight: "",
    minsunDist: "",
    maxsunDist: "",
    mintime: "",
    maxtime: "",
    minluna: "",
    maxluna: "",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.id]: e.target.value });
  };

  const generarReporte = async () => {
    const params = new URLSearchParams();

    Object.keys(filtros).forEach((key) => {
      if (filtros[key]) params.append(key, filtros[key]);
    });

    try {
      const res = await fetch(
        `http://localhost:3000/api/reporte/idPlanet?${params.toString()}`,
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
        setResultado("Error al generar reporte");
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
          id="mindiameter"
          value={filtros.mindiameter}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxdiameter"
          value={filtros.maxdiameter}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Masa (Ton): desde </label>
        <input
          type="number"
          id="minweight"
          value={filtros.minweight}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxweight"
          value={filtros.maxweight}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Distancia Sol (Km): desde </label>
        <input
          type="number"
          id="minsunDist"
          value={filtros.minsunDist}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxsunDist"
          value={filtros.maxsunDist}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Días de órbita: desde </label>
        <input
          type="number"
          id="mintime"
          value={filtros.mintime}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxtime"
          value={filtros.maxtime}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Cantidad de lunas: desde </label>
        <input
          type="number"
          id="minluna"
          value={filtros.minluna}
          onChange={handleChange}
        />
        <label>, hasta </label>
        <input
          type="number"
          id="maxluna"
          value={filtros.maxluna}
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
