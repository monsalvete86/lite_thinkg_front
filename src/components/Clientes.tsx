import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as ClienteService from "../services/cliente.service";
import ICliente from '../types/cliente.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer"

const Clientes: React.FC = () => {
    
    const [clientes, setClientes] = useState<Array<ICliente>>([]);
    const [currentCliente, setCurrentCliente] = useState<ICliente | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchCliente, setSearchClientes] = useState<string>("");
    
    const clientesRef = useRef();
    console.log("process.env");
    // clientesRef.current = clientes;
    
    useEffect(() => {
        retrieveClientes();
    }, []);

    const retrieveClientes = () => {
        ClienteService.getAll()
        .then((response) => {
            setClientes(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveClientes();
    };

    const setActiveCliente = (cliente: ICliente, index: number) => {
        setCurrentCliente(cliente);
        setCurrentIndex(index);
    };

    const cleanCliente = () => {
        setCurrentCliente(null);
        setCurrentIndex(-1);
    };
    



    return (
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2>Clientes</h2>
                </div>
            </div>
            <div className="list row">
                <div className="col-md-8">
                    
                </div>
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                            
                            >
                                Search
                            </button> 
                            <Link
                                to={"/clientes/new"}
                                className="ml-2 btn btn-primary"
                            >
                                New
                            </Link>
                            <PDFDownloadLink document={<ReportPDF clientes={clientes}/>} fileName="report.pdf">
                                <button className="ml-2 btn btn-danger">
                                    Dowload PDF
                                </button>
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 list">
                    <table
                        className="table table-striped table-bordered"
                    >
                        <thead>
                            <tr className="text-center">
                                <th>Nombre</th><th>Apellido</th><th>Telefono</th><th>Direccion</th><th>Ciudad</th><th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            
                            {
                                clientes &&
                                clientes.map((row, index) => {
                                    return (
                                        <tr key={row.id}>
                                            <td>{row.nombre}</td>
                                            <td>{row.apellido}</td>
                                            <td className="text-right">{row.telefono}</td>
                                            <td>{row.direccion}</td>
                                            <td>{row.ciudad}</td>
                                            <td className="text-center">
                                                <Link
                                                    to={"/clientes/" + row?.id}
                                                    className="btn btn-primary"
                                                >
                                                    Edit
                                                </Link>
                                                                                    
                                            </td>
                                            <td className="text-center"><button  className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Clientes;

