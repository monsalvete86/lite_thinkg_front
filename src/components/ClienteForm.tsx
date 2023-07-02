import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as ClientesService from "../services/cliente.service";
import ICliente from "../types/cliente.type";
import { getCurrentUser } from "../services/auth.service";

type MyProps = {
    id?: number,
    hiddeComponent?: (hide: boolean) => void
}

const ClienteForm: React.FC<MyProps> = (props) => {
    const currentUser = getCurrentUser();
    const id = props.id;
    let navigate = useNavigate();

    const initialClienteState = {
        id: null,
        nombre: "",
        apellido: "",
        telefono: 0,
        direccion: "",
        ciudad: "",
    };

    const [cliente, setCliente] = useState(initialClienteState);
    const [isLoading, setIsLoading] = useState(false)
    const [banEdit, setBanEdit] = useState<number>(0);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    };

    const getCliente = (id: number) => {
        ClientesService.get(id)
            .then((response: any) => {
                setCliente(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id) {
            ClientesService.get(id)
                .then((result: any) => {
                    setBanEdit(result.data.id)
                    setCliente(result.data);
                })
        }
    }, []);

    const saveCliente = () => {
        setIsLoading(true)
        var data = {
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            ciudad: cliente.ciudad,
        };

        if (!cliente?.id || cliente?.id === null) {

            ClientesService.create(data)
                .then((response: any) => {
                    console.log(response.data);
                    window.alert('Cliente guardado correctamente')
                    if (props.hiddeComponent) {
                        props.hiddeComponent(false)
                    }
                    setIsLoading(false)
                })
                .catch((e: Error) => {
                    console.log(e);
                    setIsLoading(false)
                });
        } else {
            ClientesService.update(cliente.id, data)
                .then((response: any) => {
                    setIsLoading(false)
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    setIsLoading(false)
                    console.log(e);
                });
        }
    };

    const hiddeModal = () => {
        if (props.hiddeComponent) {
            props.hiddeComponent(false)
        }
    }

    useEffect(() => {
        if (id)
            getCliente(id);
    }, [id]);

    return (
        <div className="submit-form">
            <div>

                {cliente?.id && `Current Cliente ${cliente.nombre} - ${cliente.apellido} - ${cliente.telefono} - ${cliente.direccion} - ${cliente.ciudad}`}
                {!cliente?.id && 'New Cliente'}
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        required
                        value={cliente.nombre}
                        onChange={handleInputChange}
                        name="nombre"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        required
                        value={cliente.apellido}
                        onChange={handleInputChange}
                        name="apellido"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Telefono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefono"
                        required
                        value={cliente.telefono}
                        onChange={handleInputChange}
                        name="telefono"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Direccion</label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        required
                        value={cliente.direccion}
                        onChange={handleInputChange}
                        name="direccion"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ciudad"
                        required
                        value={cliente.ciudad}
                        onChange={handleInputChange}
                        name="ciudad"
                    />
                </div>
                {!isLoading && (<div className="modal-footer">
                    <button className="btn btn-success" onClick={saveCliente}>Guardar</button>
                    {!props.hiddeComponent && <Link
                        data-dismiss="modal"
                        to={"/clientes"}
                        className="ml-2 btn btn-secondary"
                    >
                        Cancelar
                    </Link>
                    }
                    {props.hiddeComponent && <button className="btn btn-secondary" onClick={hiddeModal}>Cancelar</button>
                    }
                </div>)}
                {isLoading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <h5>Guardando</h5>
                    </div>
                )

                }
            </div>
        </div>
    );

}

export default ClienteForm;
