import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Gestionar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tipoOcultar, setTipoOcultar] = useState("");
  const [elementos, setElementos] = useState([]);
  const [idOcultar, setIdOcultar] = useState("");

  const [tipoRestaurar, setTipoRestaurar] = useState("");
  const [idRestaurar, setIdRestaurar] = useState("");

  useEffect(() => {
    if (!tipoOcultar) {
      setElementos([]);
      return;
    }

    const cargar = async () => {
      const endpoint = tipoOcultar === "planeta" ? "planetas" : "lunas";
      try {
        const res = await fetch(`${API_URL}/admin/${endpoint}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setElementos(data);
      } catch (error) {
        console.error("Error al cargar elementos", error);
      }
    };
    cargar();
  }, [tipoOcultar, user.token]);

  const handleSoftDelete = async () => {
    if (!tipoOcultar || !idOcultar) return;

    const endpoint = tipoOcultar === "planeta" ? "planetas" : "lunas";
    try {
      const res = await fetch(
        `${API_URL}/admin/${endpoint}/${idOcultar}/soft-delete`,
        {
          method: "PATCH",
          headers: { 
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json"
          },
        }
      );

      const data = await res.json();
      alert(data.message || "Elemento ocultado");
      setTipoOcultar("");
      setIdOcultar("");
    } catch (error) {
      alert("Error en el borrado lógico");
    }
  };

  const handleRestore = async () => {
    if (!tipoRestaurar || !idRestaurar) return;

    const endpoint = tipoRestaurar === "planeta" ? "planetas" : "lunas";
    try {
      const res = await fetch(
        `${API_URL}/admin/${endpoint}/${idRestaurar}/restore`,
        {
          method: "PATCH",
          headers: { 
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json"
          },
        }
      );

      const data = await res.json();
      alert(data.message || "Elemento restaurado");
      setIdRestaurar("");
      setTipoRestaurar("");
    } catch (error) {
      alert("Error al restaurar elemento");
    }
  };

  return (
    <div>
      <h2>Gestionar datos guardados</h2>

      <section>
        <h3>Ocultar (Soft delete)</h3>
        <label>Tipo: </label>
        <select
          value={tipoOcultar}
          onChange={(e) => setTipoOcultar(e.target.value)}
        >
          <option value="">Seleccione</option>
          <option value="planeta">Planeta</option>
          <option value="luna">Luna</option>
        </select>
        <br />
        <br />

        <label>Elemento: </label>
        <select
          value={idOcultar}
          onChange={(e) => setIdOcultar(e.target.value)}
        >
          <option value="">Seleccione elemento</option>
          {elementos.map((el) => {
            const idReal = tipoOcultar === "planeta" ? el.idPlanet : el.idLuna;
            return (
              <option key={idReal} value={idReal}>
                {el.name} (ID {idReal})
              </option>
            );
          })}
        </select>
        <button onClick={handleSoftDelete}>Ocultar</button>
      </section>

      <hr />

      <section>
        <h3>Restaurar</h3>
        <label>Tipo: </label>
        <select
          value={tipoRestaurar}
          onChange={(e) => setTipoRestaurar(e.target.value)}
        >
          <option value="">Seleccione</option>
          <option value="planeta">Planeta</option>
          <option value="luna">Luna</option>
        </select>
        <br />
        <br />
        <input
          type="number"
          placeholder="ID a restaurar"
          value={idRestaurar}
          onChange={(e) => setIdRestaurar(e.target.value)}
        />
        <button onClick={handleRestore}>Restaurar</button>
      </section>

      <br />
      <button onClick={() => navigate("/")}>Volver</button>
    </div>
  );
}

export default Gestionar;
