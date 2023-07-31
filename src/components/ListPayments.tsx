import React, { useState, useEffect} from "react";
import * as PagoService from "../services/pago.service";
import IPago from '../types/pago.type';
import {useParams } from "react-router-dom";
import PagoForm from "./PagoForm";

const ListPayments: React.FC = () => {
  const [listpayments, setListPayments] = useState<Array<IPago>>([]);
  const [showModal, setShowModal] = useState(false);


  const { subscriptionId } = useParams() ;
  const auxId = parseInt(subscriptionId ?? '0', 10)
  useEffect(() => {
    retrieveListPayments();
  }, []);

  const retrieveListPayments = async () => {
    await PagoService.getPaymentSubscription(subscriptionId)
      .then((response) => {
        setListPayments(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const isActiveModal = (isShow: boolean = false) => {
    setShowModal(isShow)
  }

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Lista de Pago</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <button onClick={() => window.history.back()} className="btn btn-secondary">Regresar</button>
            <button onClick={() => isActiveModal(true)} className="btn btn-primary ml-2">Registrar Pago</button>
          </div>
        </div>
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>N° Suscripción</th>
                <th>Operadora</th>
                <th>Pago Mensual</th>
                <th>Estado</th>
                <th>Fecha Pago</th>
                <th colSpan={1}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listpayments &&
                listpayments.map((row) => (
                  <tr key={row.id}>
                    <td className="text-center">{row?.id}</td>
                    <td className="text-center">{row?.user?.name} {row?.user?.last_name}</td>
                    <td className="text-center">{row?.monthlyPayment}</td>
                    <td className="text-center">{row.statePago? 'Activo' : 'Cancelado'}</td>
                    <td className="text-center">{row?.fechaPago}</td>
                    <td className="text-center">
                      <button className="btn btn-danger">
                          Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal &&
        <PagoForm id={auxId} isOpenModal={(hide)=>isActiveModal(hide)} retrieveListPayments={retrieveListPayments} />
      }
    </div>
  );
};

export default ListPayments;



