import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import * as PagosService from "../services/pago.service";
import { boolean } from "yup";

type Props = {
  isOpenModal?: (hide:boolean) => void,
  id: number | undefined
}

const PagoForm: React.FC<Props> = (props) => {

  const { id } = props;
  let navigate = useNavigate();

  const initialPagoState = {
    id: null,
    clientId: "",
    subscriptionId: "",
    operatorId: "",
    metodoPago: "",
    monthlyPayment: "",
    importe: undefined ,
    statePago: boolean,
    fechaPago: "",
  };

  const [pago, setPago] = useState(initialPagoState);
  const [, setBanEdit] = useState<number> (0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPago({ ...pago, [name]: value });
  };

  const getPago = (id: number) => {
    PagosService.get(id)
    .then((response: any) => {
      setPago(response.data);
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };

  useEffect(() => {
   /* if (id) {
      PagosService.get(id)
      .then((result: any) => {
        setBanEdit(result.data.id)
        setPago(result.data);
      })
    }*/
  }, [id]);

  const savePago = () => {
    var data = {
      clientId: pago.clientId,
      subscriptionId: pago.subscriptionId,
      operatorId: pago.operatorId,
      metodoPago: pago.metodoPago,
      importe: pago.importe,
      monthlyPayment: pago.monthlyPayment,
      statePago: pago?.statePago() ? true : false,
      fechaPago: pago.fechaPago,
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
      // navigate("/pagos");
      // window.location.reload();
  };

  useEffect(() => {
    // if (id)
      // getPago(id);
  }, [id]);

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
                      type="text"
                      className="form-control"
                      id="fechaPago"
                      required
                      value={pago.fechaPago}
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