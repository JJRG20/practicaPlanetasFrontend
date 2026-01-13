import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Actualizar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("");
  const [planetas, setPlanetas] = useState([]);
  const [lunas, setLunas] = useState([]);

  const [idSeleccionado, setIdSeleccionado] = useState("");
  const [idNuevoPlaneta, setIdNuevoPlaneta] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    diameter: "",
    weight: "",
    sunDist: "",
    time: "",
  });

  useEffect(() => {
    if (!tipo) return;

    const cargarListas = async () => {
      try {
        if (tipo === "planeta") {
          const res = await fetch(`${API_URL}/admin/planetas`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const data = await res.json();
          setPlanetas(data);
        } else {
          // Cargar lunas directamente
          const resL = await fetch(`${API_URL}/admin/lunas`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const dataL = await resL.json();
          setLunas(dataL);
          
          // También necesitamos planetas para la re-asociación
          const resP = await fetch(`${API_URL}/admin/planetas`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const dataP = await resP.json();
          setPlanetas(dataP);
        }
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    };
    cargarListas();
  }, [tipo, user.token]);

  const manejarSeleccion = (id) => {
    setIdSeleccionado(id);
    if (!id) {
      setFormData({
        name: "",
        diameter: "",
        weight: "",
        sunDist: "",
        time: "",
      });
      return;
    }

    const lista = tipo === "planeta" ? planetas : lunas;
    // Backend usa idPlanet o idLuna
    const encontrado = lista.find((item) => {
      const itemId = tipo === "planeta" ? item.idPlanet : item.idLuna;
      return String(itemId) === String(id);
    });

    if (encontrado) {
      setFormData({
        name: encontrado.name || "",
        diameter: encontrado.diameter || "",
        weight: encontrado.weight || "",
        sunDist: encontrado.sunDist || "",
        time: encontrado.time || "",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const ejecutarActualizacion = async () => {
    const endpoint = tipo === "planeta" ? "planetas" : "lunas";
    const url = `${API_URL}/admin/${endpoint}/${idSeleccionado}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} actualizado con éxito`
        );
        navigate("/ver");
      } else {
        alert("Error: " + (data.message || "No se pudo actualizar"));
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  const cambiarAsociacion = async () => {
    if (!idNuevoPlaneta) {
      alert("Seleccione un planeta destino");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/admin/lunas/${idSeleccionado}/planeta`,
        {
          method: "PATCH",
          headers: { 
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ newIdPlanet: idNuevoPlaneta })
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Asociación cambiada con éxito");
        navigate("/ver");
      } else {
        alert("Error: " + (data.message || "No se pudo cambiar la asociación"));
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <div>
      <h2>Actualizar Planeta o Luna</h2>
      <label>¿Qué deseas actualizar? </label>
      <select
        value={tipo}
        onChange={(e) => {
          setTipo(e.target.value);
          setIdSeleccionado("");
          setPlanetas([]);
          setLunas([]);
        }}
      >
        <option value="">Seleccione</option>
        <option value="planeta">Planeta</option>
        <option value="luna">Luna</option>
      </select>

      <hr />

      {tipo && (
        <div>
          <h3>Modificar Datos</h3>
          <label>{tipo === "planeta" ? "Planeta:" : "Luna:"}</label>
          <select
            value={idSeleccionado}
            onChange={(e) => manejarSeleccion(e.target.value)}
          >
            <option value="">Seleccione un elemento</option>
            {(tipo === "planeta" ? planetas : lunas).map((item) => {
               const itemId = tipo === "planeta" ? item.idPlanet : item.idLuna;
               return (
                <option key={itemId} value={itemId}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />

          <label>Nombre:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <label>Diámetro (Km):</label>
          <input
            type="number"
            step="any"
            id="diameter"
            value={formData.diameter}
            onChange={handleChange}
          />
          <br />
          <label>Masa (Ton):</label>
          <input
            type="number"
            step="any"
            id="weight"
            value={formData.weight}
            onChange={handleChange}
          />
          <br />

          {tipo === "planeta" && (
            <>
              <label>Distancia Sol (Km):</label>
              <input
                type="number"
                step="any"
                id="sunDist"
                value={formData.sunDist}
                onChange={handleChange}
              />
              <br />
              <label>Tiempo Órbita (días):</label>
              <input
                type="number"
                step="any"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
              <br />
            </>
          )}

          <button onClick={ejecutarActualizacion}>Actualizar Datos</button>

          {tipo === "luna" && (
            <div
              style={{
                marginTop: "20px",
                borderTop: "1px solid #ccc",
                paddingTop: "10px",
              }}
            >
              <h3>Cambiar Planeta Asociado</h3>
              <label>Nuevo Planeta:</label>
              <select
                value={idNuevoPlaneta}
                onChange={(e) => setIdNuevoPlaneta(e.target.value)}
              >
                <option value="">Seleccione planeta destino</option>
                {planetas.map((p) => (
                  <option key={p.idPlanet} value={p.idPlanet}>
                    {p.name}
                  </option>
                ))}
              </select>
              <button onClick={cambiarAsociacion}>Cambiar Asociación</button>
            </div>
          )}
        </div>
      )}
      <br />
      <button onClick={() => navigate("/")}>Volver</button>
    </div>
  );
}

export default Actualizar;
