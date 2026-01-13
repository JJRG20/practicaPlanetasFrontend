import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Crear() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("planeta");
  const [planetas, setPlanetas] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    diameter: "",
    weight: "",
    sunDist: "",
    time: "",
    idPlanet: "",
  });

  // Cargar planetas solo si el tipo es 'luna'
  useEffect(() => {
    if (tipo === "luna") {
      fetch(`${API_URL}/admin/planetas`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => res.json())
        .then((data) => setPlanetas(data))
        .catch((err) => console.error("Error cargando planetas", err));
    }
  }, [tipo, user.token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = tipo === "planeta" ? "/admin/planetas" : "/admin/lunas";

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} creado/a con éxito`
        );
        navigate("/ver");
      } else {
        alert("Error: " + (data.message || "No se pudo realizar la operación"));
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <div>
      <h3>Crear Nuevo Elemento</h3>

      <label>¿Qué deseas crear? </label>
      <select
        value={tipo}
        onChange={(e) => {
          setTipo(e.target.value);
          setFormData({
            name: "",
            diameter: "",
            weight: "",
            sunDist: "",
            time: "",
            idPlanet: "",
          });
        }}
      >
        <option value="planeta">Planeta</option>
        <option value="luna">Luna</option>
      </select>

      <hr />

      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label>Diámetro (Km):</label>
        <input
          type="number"
          step="any"
          id="diameter"
          value={formData.diameter}
          onChange={handleChange}
          required
        />
        <br />

        <label>Masa (Ton):</label>
        <input
          type="number"
          step="any"
          id="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <br />

        {tipo === "planeta" ? (
          <>
            <label>Distancia al sol (Km):</label>
            <input
              type="number"
              step="any"
              id="sunDist"
              value={formData.sunDist}
              onChange={handleChange}
              required
            />
            <br />
            <label>Tiempo de órbita (días):</label>
            <input
              type="number"
              step="any"
              id="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <br />
          </>
        ) : (
          <>
            <label>Planeta asociado:</label>
            <select
              id="idPlanet"
              value={formData.idPlanet}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un planeta</option>
              {planetas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <br />
          </>
        )}

        <button type="submit">Guardar {tipo}</button>
        <button type="button" onClick={() => navigate("/")}>
          Volver
        </button>
      </form>
    </div>
  );
}

export default Crear;
