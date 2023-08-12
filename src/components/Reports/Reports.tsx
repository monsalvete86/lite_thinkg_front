import React, { useState, useEffect, ChangeEvent } from "react";
import SubcriptionsReport from "./SubcriptionsRepot";

const Report = () => {

  const [reports, setReports] = useState([]);
  const [report, setReport] = useState(<div></div>);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log('name value ')
    console.log(name + ' - ' + value)
    selectedReport(value);
    // setSubscription({ ...subscription, [name]: value });
    // validateFields(subscription)
  };

  const selectedReport = (report: string ) => {
    switch(report) {
      case 'SUBSCRIPTIONS':
        return setReport(<div><SubcriptionsReport /></div>);
      default:
          setReport(<div></div>);
        break;
    }
  }

  useEffect(() => {
    // Get the report reports from the server.
    fetch("")
    .then(response => response.json())
    .then(json => setReports(json.reports));
  }, []);

  return (
    <>
      <div>
        <div className="list row">
          <div className="col-md-3">
            <h3>Informes Generales</h3>
          </div>
          <div className="col-md-9">
            <div className="input-group mb-3">
              <select name="stateReports" id="stateReports" className="custom-select mr-2" onChange={handleNameChange}>
                <option value="">--Seleccionar -- </option>
                <option value="SUBSCRIPTIONS">Reportes de suscripciones </option>
                <option value="CLIENTS">Reportes de clientes </option>
                <option value="PAYMENTS">Reportes de pagos </option>
                <option value="USERS">Reportes de usuarios </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {report}
    </>
  );
};

export default Report;