import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as PagosService from "../services/pago.service";

type Props = {
  isOpenModal?: (hide:boolean) => void
}

const PagoForm: React.FC<Props> = (props) => {

  const { id } = useParams();
  let navigate = useNavigate();

  const initialPagoState = {
    id: null,
    clientId: "",
    subscriptionId: "",
    metodoPago: "",
    importe: "",
    state: "",
    fechaPago: "",
  };

  const [pago, setPago] = useState(initialPagoState);
  const [banEdit, setBanEdit] = useState<number> (0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPago({ ...pago, [name]: value });
  };

  const getPago = (id: string) => {
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
    if (id) {
      PagosService.get(id)
      .then((result: any) => {
        setBanEdit(result.data.id)
        setPago(result.data);
      })
    }
  }, [id]);

  const savePago = () => {
    var data = {
      clientId: pago.clientId,
      subscriptionId: pago.subscriptionId,
      metodoPago: pago.metodoPago,
      importe: pago.importe,
      state: pago.state,
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
      navigate("/pagos");
      window.location.reload();
  };

  useEffect(() => {
    if (id)
      getPago(id);
  }, [id]);

  return (
    <div className="modal-dialog modal-dialog-scrollable">
      <div className="modal" id="modalCreatePago" tabIndex={-6} aria-labelledby="modalCreatePagoLabel" style={{ display: 'block', backgroundColor: "#00000078" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {pago?.id && 'Edit Pago'}
              {!pago?.id && 'Pagar'}
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
              <Link to={"/pagos"} className="ml-2 btn btn-secondary">Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoForm;