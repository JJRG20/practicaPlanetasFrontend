import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerPlanetas from "./pages/VerPlanetas";
import Crear from "./pages/Crear";
import Actualizar from "./pages/Actualizar";
import Gestionar from "./pages/Gestionar";
import Eliminar from "./pages/Eliminar";
import Reporte from "./pages/Reporte";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ver" element={<VerPlanetas />} />
          <Route path="/crear" element={<Crear />} />{" "}
          <Route path="/actualizar" element={<Actualizar />} />
          <Route path="/gestionar" element={<Gestionar />} />
          <Route path="/eliminar" element={<Eliminar />} />
          <Route path="/reporte" element={<Reporte />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
