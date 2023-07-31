import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import * as PagosService from "../services/pago.service";
import * as SubscriptionService from "../services/subscription.service";
import { boolean } from "yup";

type Props = {
  isOpenModal?: (hide:boolean) => void,
  id: number | undefined,
  retrieveListPayments?: any
}

const PagoForm: React.FC<Props> = (props) => {

  const { id } = props;
  let navigate = useNavigate();

  const [pago, setPago] = useState<any>();
  const [fechaPago, setFechaPago] = useState<any>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFechaPago(value);
  };

  const getPago = (id: any) => {
    SubscriptionService.get(id)
    .then((response: any) => {
      const initialPagoState = {
        clientId: response.data.clientId,
        subscriptionId: response.data.id,
        operatorId: response.data.operatorId,
        metodoPago: "",
        monthlyPayment: response.data.monthlyPayment,
        importe: response.data.monthlyPayment,
        statePago: true,
      };

      setPago(initialPagoState);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };

  useEffect(() => {
    if (id) {
      getPago(id)
    }
  }, [id]);

  const savePago = async () => {
    var data = {
      clientId: pago.clientId,
      subscriptionId: pago.subscriptionId,
      operatorId: pago.operatorId,
      metodoPago: pago.metodoPago,
      importe: pago.importe,
      monthlyPayment: pago.monthlyPayment,
      statePago: pago?.statePago,
      fechaPago: fechaPago,
    };

    if(!pago?.id || pago?.id === null) {
      PagosService.create(data)
      .then((response: any) => {
          console.log(response.data);
      })
      .catch((e: Error) => {
          console.log(e);
      });
    } else {
      PagosService.update(pago.id, data)
      .then((response: any) => {
        console.log("data ")
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    }

    await props.retrieveListPayments();
    if (props.isOpenModal) {
      props.isOpenModal(false);
    }
  };

  const handleCancel = () => {
    if (props.isOpenModal) {
      props.isOpenModal(false); // Cierra el modal al hacer clic en el botón "Cancelar"
    }
  };

  return (
    <div className="modal-dialog modal-dialog-scrollable">
      <div className="modal" id="modalCreatePago" tabIndex={-6} aria-labelledby="modalCreatePagoLabel" style={{ display: 'block', backgroundColor: "#00000078" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {pago?.id && 'Pagar'}
              {!pago?.id && 'Registrar Pago'}
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form className="form" action="">
                  <div className="form-group">
                    <label htmlFor="fechaPago">Fecha pago</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fechaPago"
                      required
                      value={fechaPago || ''}
                      onChange={handleInputChange}
                      name="fechaPago"
                    />
                  </div>
                </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={savePago}>Save</button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoForm;