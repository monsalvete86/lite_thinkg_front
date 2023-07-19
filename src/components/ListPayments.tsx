import React, { useState, useEffect} from "react";
import * as PagoService from "../services/pago.service";
import IListPayments from '../types/listpayments.type';
import { Link, useParams } from "react-router-dom";
import PagoForm from "./PagoForm";

const ListPayments: React.FC = () => {
  const [listpayments, setListPayments] = useState<Array<IListPayments>>([]);
  const [showModal, setShowModal] = useState(false);

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
                <th colSpan={1}>Actions</th>
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
                    <td className="text-center">
                    <Link to={"/listpayments/:new"} className="ml-2 btn btn-primary" data-target="#modalCreateListPayments" onClick={() => isActiveModal(true)}>
                      Pagar
                    </Link>
                    {showModal && <PagoForm isOpenModal={(hide)=>isActiveModal(hide)} ></PagoForm>}
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

export default ListPayments;



