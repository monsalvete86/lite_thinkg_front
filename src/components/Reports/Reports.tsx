import React, { useState, useEffect } from "react";
import ReportPDF from "../ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer"

const Report = () => {

  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Get the report reports from the server.
    fetch("")
    .then(response => response.json())
    .then(json => setReports(json.reports));
  }, []);

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Informes</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-12">
          <label htmlFor="stateReports">Seleccionar Informe</label>
          <div className="input-group mb-3">
            <select name="stateReports" id="stateReports" className="custom-select">
              <option value="">--Seleccionar -- </option>
              <option value="SUBSCRIPTIONS">suscripciones </option>
              <option value="CLIENTS">clientes </option>
              <option value="PAYMENTS">pagos </option>
              <option value="USERS">usuarios </option>
            </select>
            <button className="btn btn-outline-success" type="button">
              Buscar
            </button>
            <PDFDownloadLink document={<ReportPDF />} fileName="report.pdf">
                <button className="ml-2 btn btn-danger">
                  Dowload PDF
                </button>
              </PDFDownloadLink>
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
                <th>usuarios</th>
                <th>clientes</th>
                <th>suscripciones</th>
                <th>pagos</th>
                <th>procesadoras</th>
                <th>compañias</th>
                {/*<th colSpan={2}>Acciones</th>*/}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
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

export default Report;