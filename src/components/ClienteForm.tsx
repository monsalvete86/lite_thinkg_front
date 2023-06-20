import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as ClientesService from "../services/cliente.service";
import ICliente from "../types/cliente.type";
import { getCurrentUser } from "../services/auth.service";


const ClienteForm: React.FC = () => {
    const currentUser = getCurrentUser();
    const { id }= useParams();
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
    const [banEdit, setBanEdit] = useState<number> (0);
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    };
    
    const getCliente = (id: string) => {
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
        var data = {
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            ciudad: cliente.ciudad,
        };

        if(!cliente?.id || cliente?.id === null) {

            ClientesService.create(data)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        } else {
            ClientesService.update(cliente.id, data)
            .then((response: any) => {
                console.log("data ")
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        }

        navigate("/clientes");
        window.location.reload();
    };

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
                <button className="btn btn-success" onClick={saveCliente}>Save</button>
                <Link
                    to={"/clientes" }
                    className="ml-2 btn btn-secondary"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
    
}

export default ClienteForm;
