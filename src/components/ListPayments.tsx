import React, { useState, useEffect} from "react";
import * as ListPaymentsService from "../services/listpayments.service";
import * as PagoService from "../services/pago.service";
import IListPayments from '../types/listpayments.type';
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";

const ListPayments: React.FC = () => {
  const [listpayments, setListPayments] = useState<Array<IListPayments>>([]);
 
  const { subscriptionId } = useParams() ;

  useEffect(() => {
    retrieveListPayments();
  }, []);

  const retrieveListPayments = () => {
    PagoService.getPaymentSubscription(subscriptionId)
      .then((response) => {
        console.log(response)
        setListPayments(response.data.pagos);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const cleanListPayments = (id: number | null | undefined) => {
    const confirmation = window.confirm("¿Está seguro de que desea eliminar este pago?");
    if (confirmation) {
      console.log(id);
      ListPaymentsService.remove(id);
      retrieveListPayments();
    }
  };

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Lista de Pagos</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            
            <PDFDownloadLink document={<ReportPDF listpayments={listpayments} />} fileName="report.pdf">
              <button className="ml-2 btn btn-danger">Download PDF</button>
            </PDFDownloadLink>
          </div>
        </div>
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>N° Suscripción</th>
                <th>Operadora</th>
                <th>Cuota Mensual</th>
                <th>Estado</th>
                <th>Fecha Pago</th>
              </tr>
            </thead>
            <tbody>
              {listpayments &&
                listpayments.map((row) => (
                  <tr key={row.id}>
                    <td className="text-center">{row.subscriptionId}</td>
                    <td className="text-center">{row.metodoPago}</td>
                    <td className="text-center">{row.importe}</td>
                    <td className="text-center">{row.state}</td>
                    <td className="text-center">{row.fechaPago}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListPayments;



