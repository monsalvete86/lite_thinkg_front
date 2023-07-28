import React, { useState, useEffect, ChangeEvent } from "react";
import * as PagoService from "../services/pago.service";
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";


const Pagos: React.FC = () => {
  const [pagos, setPagos] = useState<Array<any>>();
  const [searchStatePayment, setSearchStatePayment] = useState(true);
  const [paymentStateFilter, setPaymentStateFilter] = useState('');

  useEffect(() => {
    retrievePayment();
  }, []);

  const retrievePayment = async () => {
    let data = {
      paymentStateFilter: paymentStateFilter,
      state: searchStatePayment
    }
    const resPagos = await PagoService.getAll(data);
    setPagos(resPagos.data)
  };

  useEffect(() => {
    retrievePayment();
    console.log('paymentStateFilter')
    console.log(paymentStateFilter)
  }, [paymentStateFilter]);

  const handleStatePaymentChange = (text: ChangeEvent<HTMLSelectElement>) => {
    setPaymentStateFilter(text.target.value);
  };

  const stateValidate = (cantPagos: number, diaPago: number) => {
    const today = new Date();
    const dayOfMonth = today.getDate();

    if (cantPagos > 0) { return 'Pagado'; }

    if (cantPagos === 0 && diaPago > dayOfMonth) { return 'Vencido'; }

    if (cantPagos === 0 && dayOfMonth - diaPago < 6) { return 'Por Vencer'; }

    return 'Al día'

  }

  const formatDate = (date: string) => {
    return new Date(date).toISOString().split('T')[0]
  }

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
              <option value="">--Seleccionar -- </option>
              <option value="PAGADO">Pagados  </option>
              <option value="PORVENCER">Proximos a vencer  </option>
              <option value="VENCIDO">Vencida  </option>
            </select>
            <button className="btn btn-outline-success" type="button" onClick={retrievePayment}>
              Buscar
            </button>
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
                <th>Dia Pago</th>
                <th colSpan={1}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagos && pagos.length > 0 &&
                pagos.map((row) => (
                  <tr key={row.id}>
                    <td className="text-center">{row?.cliente?.nombre} {row?.cliente?.apellido}</td>
                    <td className="text-center">{row?.id}</td>
                    <td className="text-center">{row?.user?.name} {row?.user?.last_name}</td>
                    <td className="text-center">{formatDate(row?.monthlyPayment)}</td>
                    <td className="text-center">{stateValidate(row?.pagos.length, row?.startCoverage.split('-')[2])}</td>
                    <td className="text-center">{row?.startCoverage.split('-')[2]}</td>
                    <td className="text-center">
                      <Link to={"/listpayments/" + row?.id} className="btn btn-primary">Pagos</Link>
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



