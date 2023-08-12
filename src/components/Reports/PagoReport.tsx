import React, { useState, useEffect, ChangeEvent } from "react";
import * as PagoService from "../../services/pago.service";
import ReportPDF from "../ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer";
import * as SubscriptionService from "../../services/subscription.service";
import states from "../../common/state-subscription";

interface IpagoReporteFilter {
  statePayment?: string | undefined,
  client?: string | undefined
}

const initialState: IpagoReporteFilter = {
  statePayment: '',
  client: ''
}

const PagoReport: React.FC = () => {
  const [pagos, setPagos] = useState<Array<any>>();
  const [searchStatePayment, setSearchStatePayment] = useState(true);
  const [fitlters, setFilters] = useState<IpagoReporteFilter>(initialState);

  useEffect(() => {
    retrievePayment();
  }, []);

  const retrievePayment = async (name?: any, value?:any ) => {
    setFilters({
      ...fitlters,
      [name]: value
    });
    const data = {
      ...fitlters
    }
    SubscriptionService.getAll(data)
    .then((response) => {
      setPagos(response.data);
    })
    .catch((e) => {
        console.log(e);
    });
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log('name value ')
    console.log(name + ' - ' + value)
    retrievePayment(name, value);
    // setSubscription({ ...subscription, [name]: value });
    // validateFields(subscription)
  };

  const stateValidate = (cantPagos: number, diaPago: number) => {
    const today = new Date();
    const dayOfMonth = today.getDate();

    if (cantPagos > 0) { return 'Pagado'; }

    if (cantPagos === 0 && diaPago > dayOfMonth) { return 'Vencido'; }

    if (cantPagos === 0 && dayOfMonth - diaPago < 6) { return 'Por Vencer'; }

    return 'Al día'
  }

  console.log('pagos')
  console.log(pagos)
  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h4 className="text-center">Reporte Pagos Suscripciones</h4>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-3">
          <label htmlFor="stateSubscription">Estado de pagos</label>
          <div className="input-group mb-3">
            <select name="statePayment" id="statePayment" className="custom-select" onChange={handleChangeValue}>
              <option value="">--Seleccionar--</option>
              <option value="ACCEPTED">Pagados</option>
              <option value="PORVENCER">Proximos a vencer</option>
              <option value="VENCIDO">Vencida</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="stateSubscription">Cliente</label>
          <div className="input-group mb-3">
            <input
              className="form-control"
              placeholder="Cliente"
              id="client"
              name="cliente"
              value={fitlters?.client}
              onChange={handleChangeValue}
            />
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="stateSubscription">Operadora</label>
          <div className="input-group mb-3">
            <input
              className="form-control"
              placeholder="Operadora"
              id="client"
              name="operadora"
              value={fitlters?.client}
              onChange={handleChangeValue}
            />
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="stateSubscription">Dia pago</label>
          <div className="input-group mb-3">
            <input
              className="form-control"
              placeholder="Cliente"
              id="client"
              name="cliente"
              value={fitlters?.client}
              onChange={handleChangeValue}
            />
          </div>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-12">
          <button className="btn btn-outline-success" type="button" onClick={retrievePayment}>
            Buscar
          </button>
          <PDFDownloadLink document={<ReportPDF/>} fileName="report.pdf">
            <button className="ml-1 btn btn-danger">
              Dowload PDF
            </button>
          </PDFDownloadLink>
        </div>
      </div>
      <div className="list rows mt-4">
        <div className="col-md-12 list table-responsive">
          <table className="table table-striped table-bordered table-sm w-100">
            <thead>
              <tr className="text-center">
                <th>Cliente</th>
                {/*<th>N° Suscripción</th>*/}
                <th>Operadora</th>
                {/*<th>Pago Mensual</th>*/}
                <th>Estado</th>
                <th>Dia Pago</th>
              </tr>
            </thead>
            <tbody>
              {pagos && pagos.length > 0 &&
                pagos.map((row) => (
                  <tr key={row.id}>
                    <td className="text-center">{row?.cliente?.nombre} {row?.cliente?.apellido}</td>
                    {/*<td className="text-center">{row?.id}</td>*/}
                    <td className="text-center">{row?.user?.name} {row?.user?.last_name}</td>
                    {/*<td className="text-center">{row?.monthlyPayment}</td>*/}
                    <td className="text-center">
                    {/* row?.startCoverage && stateValidate(row?.pagos.length, row?.startCoverage.split('-')[2]) */}
                    </td>
                    <td className="text-center">{row?.startCoverage && row?.startCoverage.split('-')[2]}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PagoReport;
function retrievePayment(name: string, value: string) {
  throw new Error("Function not implemented.");
}

