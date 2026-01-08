import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div id="auth-area">
        <h3>Inicie sesión para trabajar</h3>
      </div>
    );
  }

  return (
    <div id="auth-area">
      {user.role === "admin" ? (
        <>
          <p>
            Bienvenido/a, <b>{user.username}</b> (Administrador)
          </p>
          <h3>Opciones Administrador</h3>
          <button onClick={() => navigate("/ver")}>Ver datos</button>
          <button onClick={() => navigate("/reporte")}>Generar reporte</button>
          <button onClick={() => navigate("/crear")}>Crear</button>
          <button onClick={() => navigate("/actualizar")}>Actualizar</button>
          <button onClick={() => navigate("/gestionar")}>
            Ocultar/Restaurar
          </button>
          <button onClick={() => navigate("/eliminar")}>Eliminar</button>
        </>
      ) : user.role === "astro" ? (
        <>
          <p>
            Bienvenido/a, <b>{user.username}</b>
          </p>
          <h3>Opciones Astrónomo</h3>
          <button onClick={() => navigate("/ver")}>Ver datos</button>
          <button onClick={() => navigate("/reporte")}>Generar reporte</button>
        </>
      ) : null}
    </div>
  );
}

export default Home;
