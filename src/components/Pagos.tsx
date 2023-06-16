import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as PagoService from "../services/pago.service";
import IPago from '../types/pago.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer"

const Pagos: React.FC = () => {
    
    const [pagos, setPagos] = useState<Array<IPago>>([]);
    const [currentPago, setCurrentPago] = useState<IPago | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchPago, setSearchPagos] = useState<string>("");
    
    const pagosRef = useRef();
    console.log("process.env");
    // productsRef.current = pagos;
    
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
        console.log(id)
        PagoService.remove(id);
        retrievePagos();
    };
    
    return (
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2>Pagos</h2>
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
                                to={"/pagos/new"}
                                className="ml-2 btn btn-primary"
                            >
                                New
                            </Link>
                            <PDFDownloadLink document={<ReportPDF pagos={pagos}/>} fileName="report.pdf">
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
                                <th>Cliente</th><th>Subscripcion</th><th>Valor pago</th><th>Fecha pago</th><th colSpan={2}>Rejistro activo</th><th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
     
                            {
                                pagos &&
                                pagos.map((row, index) => {
                                    return (
                                        <tr key={row.id}>
                                            <td>{row.cliente}</td>
                                            <td>{row.subscripcion}</td>
                                            <td>{row.valorPago}</td>
                                            <td>{row.fechaPago}</td>
                                            <td className="text-center">{row.rejistroActivo}</td>
                                            <td className="text-center"><input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"></input></td>
                                            <td className="text-center">
                                                <Link
                                                    to={"/pagos/" + row?.id}
                                                    className="btn btn-primary"
                                                >
                                                    Edit
                                                </Link>
                                                                                    
                                            </td>
                                            <td className="text-center">
                                                <button  onClick={() => cleanPago(row.id)} className="btn btn-danger">Delete</button></td>
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

export default Pagos;