import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as PagoService from "../services/pago.service";
import IPago from '../types/pago.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PagoForm from "./PagoForm";

const Pagos: React.FC = () => {
  const [pagos, setPagos] = useState<Array<IPago>>([]);
  const [currentPago, setCurrentPago] = useState<IPago | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchPago, setSearchPagos] = useState<string>("");
  const [searchFrom, setSearchFrom] = useState<string>();
  const [searchTo, setSearchTo] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  const pagosRef = useRef();

  useEffect(() => {
    retrievePagos();
  }, []);

  const retrievePagos = () => {
    PagoService.getAll()
      .then((response) => {
        setPagos(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePagos();
  };

  const setActivePago = (pago: IPago, index: number) => {
    setCurrentPago(pago);
    setCurrentIndex(index);
  };

  const cleanPago = (id: number | null | undefined) => {
    const confirmation = window.confirm("¿Está seguro de que desea eliminar este pago?");
    if (confirmation) {
        console.log(id);
        PagoService.remove(id);
        retrievePagos();
    }
  };

  const handleFromChange = (text: ChangeEvent<HTMLInputElement>) => {
    console.log(text)
    setSearchFrom(text.target.value);
  };
  const handleToChange = (text: ChangeEvent<HTMLInputElement>) => {
    console.log(text)
    setSearchTo(text.target.value);
  };

  const isActiveModal = (isShow: boolean = false) => {
    setShowModal(isShow)
  }

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Pagos</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-8"></div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchPagos(e.target.value)
              }
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Search
              </button>
              <Link to={"/pagos/new"} className="ml-2 btn btn-primary" data-target="#modalCreatePago" onClick={() => isActiveModal(true)}>
                New
              </Link>
              {showModal && <PagoForm isOpenModal={(hide)=>isActiveModal(hide)} ></PagoForm>}
              <PDFDownloadLink
                document={<ReportPDF pagos={pagos} />}
                fileName="report.pdf"
              >
                <button className="ml-2 btn btn-danger">Download PDF</button>
              </PDFDownloadLink>
            </div>
          </div>
        </div>
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Cliente</th>
                <th>Suscripción</th>
                <th>Método de Pago</th>
                <th>Importe</th>
                <th>Estado</th>
                <th>Fecha Pago</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagos &&
                pagos.map((row, index) => (
                  <tr key={row.id}>
                    <td className="text-center">{row.clientId}</td>
                    <td className="text-center">{row.subscriptionId}</td>
                    <td className="text-center">{row.metodoPago}</td>
                    <td className="text-center">{row.importe}</td>
                    <td className="text-center">{row.state}</td>
                    <td className="text-center">{row.fechaPago}</td>
                    <td className="text-center">
                      <Link to={"/pagos/" + row?.id} className="btn btn-primary">Edit</Link>
                    </td>
                    <td className="text-center">
                      <button onClick={() => cleanPago(row.id)} className="btn btn-danger">Delete</button>
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



