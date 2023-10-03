import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { GetCotizacion } from "../services/CotizacionServices";

const Cotizaciones = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // setData(GetCotizacion());
    GetCotizacion()
      .then((resp) => {
        console.log(resp.data);
        setData(resp.data);
      })
      .catch();
  }, []);

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="d-flex justify-content-evenly">
            <h1 className="mt-4">Listado de Cotizaciones</h1>
            <div>
              <button
                className="btn btn-danger mt-4"
                onClick={() => {
                  navigate("/create");
                }}
              >
                Crear
              </button>
            </div>
          </div>
          {data.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Valor Total </th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((cotizacion) => {
                  return (
                    <tr>
                      <th scope="row">{cotizacion.quote_id}</th>
                      <td>
                        {new Date(cotizacion.quote_created_at).toLocaleString()}
                      </td>
                      <td>{cotizacion.quote_name + " " + cotizacion.quote_lastname}</td>
                      <td>{cotizacion.quote_total}</td>
                      <th className="d-flex gap-3">
                        <button className="btn btn-primary">Ver</button>
                        <button className="btn btn-success">Descargar</button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            "Cargando Cotizaciones..."
          )}
        </div>
      </div>
    </div>
  );
};

export default Cotizaciones;
