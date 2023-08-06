import React, { useState, useEffect } from "react";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer"

const ClienteReport = () => {

  const [clienteReport, setClienteReport] = useState([]);

  useEffect(() => {
    // Get the report clienteReport from the server.
    fetch("")
    .then(response => response.json())
    .then(json => setClienteReport(json.clienteReport));
  }, []);

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Informes Clientes</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Buscar por cliente"/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                  Buscar
              </button>
              <PDFDownloadLink document={<ReportPDF/>} fileName="report.pdf">
                <button className="ml-2 btn btn-danger">
                  Dowload PDF
                </button>
              </PDFDownloadLink>
            </div>
          </div>
        </div>
        {/*<div className="col-md-6">
          <label htmlFor="stateSubscription">Estado de pagos</label>
          <div className="input-group mb-3">
            <select name="statePayment" id="statePayment" className="custom-select">
              <option value="">--Seleccionar -- </option>
              <option value="PAGADO">Pagados </option>
              <option value="PORVENCER">Proximos a vencer </option>
              <option value="VENCIDO">Vencida </option>
            </select>
          </div>
        </div>
        <div className="col-md my-2  w-100">
          <div className="form-row w-100">
            <div className="form-group col-md-5">
              <label >Desde</label>
              <input type="date" value="search_from" className="form-control" id="search_from" />
            </div>
            <div className="form-group col-md-5">
              <label >Hasta</label>
              <input type="date" value="search_from" className="form-control" id="search_to" />
            </div>
            <div className="form-group col-md-2 d-flex align-items-end">
              <button
                className="btn btn-block btn-outline-secondary"
                type="button"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>*/}
        <div className="col-md-12 list table-responsive">
          <table className="table table-striped table-bordered table-sm w-100">
            <thead>
              <tr className="text-center">
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Apellido_2</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                {/*<th colSpan={2}>Acciones</th>*/}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">Andrés</td>
                <td className="text-center">pupilales	</td>
                <td className="text-center">Bastidas</td>
                <td className="text-center">2147483647</td>
                <td className="text-center">calle 80 # 20 - 52	</td>
                <td className="text-center">Caquetá</td>
                {/*<td className="text-center">
                  <button className="btn btn-primary">Example</button>
                </td>
                <td className="text-center">
                  <button className="btn btn-danger">Example</button>
                </td>*/}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClienteReport;