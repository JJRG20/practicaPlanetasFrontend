import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("http://localhost:3000/api/planeta", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();

      if (tipoOcultar === "planeta") {
        setElementos(data);
      } else {
        const lunas = data.flatMap((p) => p.luna);
        setElementos(lunas);
      }
    };
    cargar();
  }, [tipoOcultar, user.token]);

  const handleSoftDelete = async () => {
    if (!tipoOcultar || !idOcultar) return;

    const res = await fetch(
      `http://localhost:3000/api/${tipoOcultar}/${idOcultar}/soft-delete`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const data = await res.json();
    alert(data.message);
    setTipoOcultar("");
  };

  const handleRestore = async () => {
    if (!tipoRestaurar || !idRestaurar) return;

    const res = await fetch(
      `http://localhost:3000/api/${tipoRestaurar}/${idRestaurar}/restore`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const data = await res.json();
    alert(data.message);
    setIdRestaurar("");
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
          {elementos.map((el) => (
            <option
              key={el.idPlanet || el.idLuna}
              value={el.idPlanet || el.idLuna}
            >
              {el.name} (ID {el.idPlanet || el.idLuna})
            </option>
          ))}
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
