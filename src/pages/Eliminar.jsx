import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Eliminar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("");
  const [id, setId] = useState("");

  const handleEliminar = async () => {
    if (!tipo || !id) {
      alert("Por favor, selecciona el tipo e ingresa el ID.");
      return;
    }

    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar permanentemente este ${tipo}? AVISO: Este proceso es irreversible.`
    );

    if (!confirmar) return;

    // Mapeo a plural para coincidir con endpoints del backend
    const endpoint = tipo === "planeta" ? "planetas" : "lunas";

    try {
      const res = await fetch(`${API_URL}/admin/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      alert(data.message || "Operación realizada");

      if (res.ok) {
        navigate("/ver");
      }
    } catch (error) {
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div>
      <h2>Eliminar Planeta o Luna</h2>
      <p style={{ color: "red", fontWeight: "bold" }}>
        AVISO: Este proceso es permanente e irreversible.
      </p>

      <label>Seleccione tipo: </label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Seleccione</option>
        <option value="planeta">Planeta</option>
        <option value="luna">Luna</option>
      </select>
      <br />
      <br />

      <label>ID a eliminar: </label>
      <input
        type="number"
        placeholder="ID de Planeta o Luna"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <br />
      <br />

      <button onClick={() => navigate("/")}>Volver</button>
      <button
        onClick={handleEliminar}
        style={{ backgroundColor: "#ff4444", color: "white" }}
      >
        Eliminar Permanentemente
      </button>
    </div>
  );
}

export default Eliminar;
