import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { GetProductos } from "../services/ProductosServices";
import { PostCotizacion } from "../services/CotizacionServices";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const CrearCotizacion = () => {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [fecha, setFecha] = useState();
  const navigate = useNavigate();

  const [QuoteObj, setQuoteObj] = useState({
    quote_name: "",
    quote_lastname: "",
    quote_direction: "",
    quote_total: "",
    quote_detail: [],
  });

  const AddProduct = (id) => {
    const productsLS = localStorage.getItem("products");
    let parse = JSON.parse(productsLS);
    let updated = parse.find((p) => p.product_id == id);
    updated.quotedetail_quantity += 1;
    updated.quotedetail_subtotal =
      updated.quotedetail_quantity * updated.quotedetail_unit_price;
    localStorage.setItem("products", JSON.stringify(parse));
    setProducts2(
      products2.map((p) =>
        p.product_id === id
          ? {
              ...p,
              quotedetail_quantity: updated.quotedetail_quantity,
              quotedetail_subtotal: updated.quotedetail_subtotal,
            }
          : p
      )
    );
  };

  const LessProduct = (id) => {
    const productsLS = localStorage.getItem("products");
    let parse = JSON.parse(productsLS);
    let updated = parse.find((p) => p.product_id == id);
    if (updated.quotedetail_quantity != 0) {
      updated.quotedetail_quantity -= 1;
      updated.quotedetail_subtotal -= updated.quotedetail_unit_price;
    }
    localStorage.setItem("products", JSON.stringify(parse));
    setProducts2(
      products2.map((p) =>
        p.product_id === id
          ? {
              ...p,
              quotedetail_quantity: updated.quotedetail_quantity,
              quotedetail_subtotal: updated.quotedetail_subtotal,
            }
          : p
      )
    );
  };

  const GetCantity = (id) => {
    const productsLS = localStorage.getItem("products");
    let parse = JSON.parse(productsLS);
    let productFind = parse.find((p) => p.product_id == id);
    return productFind.quotedetail_quantity;
  };

  const GetSubTotal = (id) => {
    try {
      const productFind = products2.find((p) => p.product_id == id);
      return productFind.quotedetail_subtotal;
    } catch (error) {
      return 0;
    }
  };

  const GetTotal = () => {
    const productsLS = JSON.parse(localStorage.getItem("products"));
    let total = 0;
    productsLS.forEach((p) => {
      total += p.quotedetail_subtotal;
    });
    return total.toFixed(2);
  };

  const GetName = (id) => {
    try {
      const select = products.find((p) => p.product_id == id);
      return select.product_name;
    } catch (error) {
      return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteObj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let products = [];
    const productsLS = JSON.parse(localStorage.getItem("products"));
    productsLS.forEach((p) => {
      if (p.quotedetail_quantity >= 1) {
        products.push(p);
      }
    });
    setQuoteObj({
      ...QuoteObj,
      quote_detail: products,
      quote_total: GetTotal(),
    });
  };

  const GuardarCotizacion = () => {
    PostCotizacion(QuoteObj).then((resp) => {
      console.log(resp);
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cotizacion Creada",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  useEffect(() => {
    GetProductos().then((resp) => {
      setProducts(resp.data);
      let products2 = [];
      resp.data.forEach((product) => {
        let p = {
          product_id: product.product_id,
          quotedetail_quantity: 0,
          quotedetail_unit_price: parseFloat(product.product_price),
          quotedetail_subtotal: 0,
        };
        products2.push(p);
      });
      localStorage.setItem("products", JSON.stringify(products2));
      setProducts2(products2);
    });
  }, []);

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <div className="d-flex flex-column">
          <div className="m-5">
            <form onSubmit={handleSubmit}>
              <div className="d-flex gap-4">
                <div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="quote_name"
                      onChange={handleChange}
                      value={QuoteObj.quote_name}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="quote_lastname"
                      onChange={handleChange}
                      value={QuoteObj.quote_lastname}
                    />
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Direccion
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="quote_direction"
                      onChange={handleChange}
                      value={QuoteObj.quote_direction}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="fecha" class="form-label">
                      Fecha
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      value={fecha}
                      onChange={(e) => {
                        setFecha(e.target.value);
                      }}
                      id="fecha"
                    />
                  </div>
                </div>
              </div>
              {/* <button type="submit" class="btn btn-primary">
                Submit
              </button> */}
            </form>
          </div>
          <table className="m-3 table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Valor Unit</th>
                <th scope="col">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0
                ? products.map((producto) => {
                    return (
                      <tr>
                        <td scope="row">{producto.product_id}</td>
                        <td>{producto.product_name}</td>
                        <td className="d-flex">
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              AddProduct(producto.product_id);
                              //UpdateSubTotal(producto.product_id);
                            }}
                          >
                            +
                          </button>
                          <p className="m-3">
                            {GetCantity(producto.product_id)}
                          </p>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              LessProduct(producto.product_id);
                              //UpdateSubTotal(producto.product_id);
                            }}
                          >
                            -
                          </button>
                        </td>
                        <td>{producto.product_price}</td>
                        <p className="m-3">
                          {GetSubTotal(producto.product_id)}
                        </p>
                      </tr>
                    );
                  })
                : "Cargando Productos..."}
            </tbody>
          </table>
          <div className="d-flex">
            <b className="m-3">Total: {GetTotal()}</b>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={handleSubmit}
            >
              Cotizar
            </button>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Cotizacion
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div className="d-flex gap-5">
                    <div>
                      <p>Nombre: {QuoteObj.quote_name}</p>
                      <p>Apellido: {QuoteObj.quote_lastname}</p>
                      <p>Direccion: {QuoteObj.quote_direction}</p>
                      <p>Fecha: {fecha}</p>
                    </div>
                    <div>
                      <b>Total: {GetTotal()}</b>
                    </div>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Valor Unit</th>
                        <th scope="col">Valor Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {JSON.parse(localStorage.getItem("products")).map(
                        (producto) => {
                          if (producto.quotedetail_quantity >= 1) {
                            return (
                              <tr>
                                <td>{GetName(producto.product_id)}</td>
                                <td>{GetCantity(producto.product_id)}</td>
                                <td>{producto.quotedetail_unit_price}</td>
                                <td>{GetSubTotal(producto.product_id)}</td>
                              </tr>
                            );
                          }
                        }
                      )}
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={GuardarCotizacion}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCotizacion;
