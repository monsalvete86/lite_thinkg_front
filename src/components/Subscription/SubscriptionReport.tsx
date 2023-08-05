import React, { useState, useEffect } from "react";
import ReportPDF from "../ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer"

const SubscriptionReport = () => {

  const [subscriptionReport, setSubscriptionReport] = useState([]);

  useEffect(() => {
    // Get the report SubscriptionReport from the server.
    fetch("")
    .then(response => response.json())
    .then(json => setSubscriptionReport(json.SubscriptionReport));
  }, []);

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Informes Suscripciones</h2>
        </div>
      </div>
      <div className="list row">
        {/*<div className="col-md-12">
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
        </div>*/}
        <div className="col-md-12">
          <label htmlFor="stateSubscription">Estado de suscripcion</label>
          <div className="input-group mb-3">
            <select name="stateSubscription" id="stateSubscription" className="custom-select">
              <option value="">--Seleccionar -- </option>
              <option value="GENERATED">Generada </option>
              <option value="ACCEPTED">Aceptada </option>
              <option value="REJECTED">Rechazada </option>
              <option value="CANCELLED">Cancelada </option>
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
        {/*<div className="col-md my-2  w-100">
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
                <th>Code</th>
                <th>Cliente</th>
                <th>Pago Mensual</th>
                <th>Fecha próximo pago</th>
                <th>Estado</th>
                <th>Lista diaria</th>
                {/*<th colSpan={2}>Acciones</th>*/}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">45</td>
                <td className="text-center">Santiago Pérez</td>
                <td className="text-center">6000</td>
                <td className="text-center">2023-07-20</td>
                <td className="text-center">ACEPTADO</td>
                <td className="text-center">25</td>
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

export default SubscriptionReport;