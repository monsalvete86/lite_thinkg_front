import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as PagosService from "../services/pago.service";
import IPago from "../types/pago.type";
import { getCurrentUser } from "../services/auth.service";


const PagoForm: React.FC = () => {
    const currentUser = getCurrentUser();
    const { id }= useParams();
    let navigate = useNavigate();

    const initialPagoState = {
        id: null,
        cliente: "",
        subscripcion: "",
        rejistroActivo: "",
        valorPago: "",
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
    }, []);
    
    const savePago = () => {
        var data = {
            cliente: pago.cliente,
            subscripcion: pago.subscripcion,
            rejistroActivo: pago.rejistroActivo,
            valorPago: pago.valorPago,
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
        <div className="submit-form">
            <div>
                {pago?.id && `Current Pago ${pago.cliente} - ${pago.subscripcion} - ${pago.rejistroActivo} - ${pago.valorPago} - ${pago.fechaPago}`}
                {!pago?.id && 'New Pago'}
                <div className="form-group">
                    <label htmlFor="cliente">Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cliente"
                        required
                        value={pago.cliente}
                        onChange={handleInputChange}
                        name="cliente"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subscripcion">Subscripcion</label>
                    <input
                        type="text"
                        className="form-control"
                        id="subscripcion"
                        required
                        value={pago.subscripcion}
                        onChange={handleInputChange}
                        name="subscripcion"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rejistroActivo">Rejistro activo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rejistroActivo"
                        required
                        value={pago.rejistroActivo}
                        onChange={handleInputChange}
                        name="rejistroActivo"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="valorPago">Valor pago</label>
                    <input
                        type="text"
                        className="form-control"
                        id="valorPago"
                        required
                        value={pago.valorPago}
                        onChange={handleInputChange}
                        name="valorPago"
                    />
                </div>
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
                <button className="btn btn-success" onClick={savePago}>Save</button>
                <Link to={"/pagos"} className="ml-2 btn btn-secondary">Cancel</Link>
            </div>
        </div>
    );
    
}

export default PagoForm;