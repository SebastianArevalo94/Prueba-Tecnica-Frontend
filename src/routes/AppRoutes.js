import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cotizaciones from "../components/Cotizaciones";
import CrearCotizacion from "../components/CrearCotizacion";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cotizaciones />} />
        <Route path="/create" element={<CrearCotizacion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
