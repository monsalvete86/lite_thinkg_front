import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as CategoriaService from "../services/categoria.service";
import ICategoria from '../types/categoria.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer"

const Categorias: React.FC = () => {
    
    const [categorias, setCategorias] = useState<Array<ICategoria>>([]);
    const [currentCategoria, setCurrentCategoria] = useState<ICategoria | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchCategoria, setSearchCategorias] = useState<string>("");
    
    const categoriasRef = useRef();
    console.log("process.env");
    // productsRef.current = ;
    
    useEffect(() => {
        retrieveCategorias();
    }, []);

    const retrieveCategorias = () => {
        CategoriaService.getAll()
        .then((response) => {
            setCategorias(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveCategorias();
    };

    const setActiveCategoria = (categoria: ICategoria, index: number) => {
        setCurrentCategoria(categoria);
        setCurrentIndex(index);
    };

    const cleanCategoria = () => {
        setCurrentCategoria(null);
        setCurrentIndex(-1);
    };
    



    return (
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2>Categorias Stock</h2>
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
                                to={"/categorias/new"}
                                className="ml-2 btn btn-primary"
                            >
                                New
                            </Link>
                            <PDFDownloadLink document={<ReportPDF categorias={categorias}/>} fileName="report.pdf">
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
                                <th>Code</th><th>Categoria Name</th><th>Stock</th><th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            
                            {
                                categorias &&
                                categorias.map((row, index) => {
                                    return (
                                        <tr key={row.id}>
                                            <td>{row.code}</td><td>{row.categoriaName}</td>
                                            <td className="text-right">{row.stock}</td>
                                            <td className="text-center">
                                                <Link
                                                    to={"/categorias/" + row?.id}
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

export default Categorias;

