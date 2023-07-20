import React, { useState, useEffect, ChangeEvent} from "react";
import * as PagoService from "../services/pago.service";
import IPago from '../types/pago.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PagoForm from "./PagoForm";

const Pagos: React.FC = () => {
  const [pagos, setPagos] = useState<Array<IPago>>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchStatePayment, setSearchStatePayment] = useState("");

  useEffect(() => {
    retrievePayment();
  }, []);

  const retrievePayment = () => {
    let data = {
      state: searchStatePayment
  }
    PagoService.getAll(data)
        .then((response) => {
            setPagos(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
};

  const isActiveModal = (isShow: boolean = false) => {
    setShowModal(isShow)
  }

  const handleStatePaymentChange = (text: ChangeEvent<HTMLSelectElement>) => {
    setSearchStatePayment(text.target.value);
};

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Pagos Suscripciones</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-8">
          <label htmlFor="stateSubscription">Estado de pagos</label>
          <div className="input-group mb-3">
                <select name="statePayment" id="statePayment" className="custom-select" onChange={handleStatePaymentChange}>
                  <option value="PAGADO">--Seleccionar -- </option>
                  <option value="PAGADO">Pagados  </option>
                  <option value="PORVENCER">Proximos a vencer  </option>
                  <option value="VENCIDO">Vencida  </option>
                </select>
                <button className="btn btn-outline-success"
                  type="button"
                  onClick={retrievePayment}
                >
                    Buscar
                </button>
              {showModal && <PagoForm isOpenModal={(hide)=>isActiveModal(hide)} ></PagoForm>}
              <PDFDownloadLink document={<ReportPDF pagos={pagos} />} fileName="report.pdf">
                <button className="ml-2 btn btn-danger">Download PDF</button>
              </PDFDownloadLink>
          </div>
        </div>
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Cliente</th>
                <th>N° Suscripción</th>
                <th>Operadora</th>
                <th>Pago Mensual</th>
                <th>Estado</th>
                <th>Fecha Pago</th>
                <th colSpan={1}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagos &&
                pagos.map((row) => (
                  <tr key={row.id}>
                    <td className="text-center">{row.cliente.nombre} {row.cliente.apellido}</td>
                    <td className="text-center">{row.subscriptionId}</td>
                    <td className="text-center">{row.metodoPago}</td>
                    <td className="text-center">{row.importe}</td>
                    <td className="text-center">{row.state}</td>
                    <td className="text-center">{row.fechaPago}</td>
                    <td className="text-center">
                      <Link to={"/listpayments/" + row?.subscriptionId} className="btn btn-primary">Pagos</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pagos;



