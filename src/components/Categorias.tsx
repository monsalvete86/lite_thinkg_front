import React, { useState, useEffect, ChangeEvent, useRef } from "react";
//import * as CategoriaService from "../services/categoria.service";
import Icategorias from '../types/categoria.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer" 


const Categorias: React.FC = () => {
    /*
    const [categorias, setCategoria] = useState<Array<ICategorias>>([]);
    const [currentCategorias, setCurrentCategorias] = useState<ICategorias | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchCategoria, setSearchCategorias] = useState<string>("");
    
    const categoriasRef = useRef();
    console.log("process.env");
    // categoriasRef.current = categorias;
    
    useEffect(() => {
        retrieveCategorias();
    }, []);

    const retrieveCategorias = () => {
        CategoriasService.getAll()
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

    const setActiveCategorias = (categorias: ICategorias, index: number) => {
        setCurrentCategorias(Categorias);
        setCurrentIndex(index);
    };

    const cleanCategorias = () => {
        setCurrentCategorias(null);
        setCurrentIndex(-1);
    };
    */



    return ( 
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2>Categorias</h2>
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
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-12 list">
                    <table
                        className="table table-striped table-bordered"
                    >
                        <thead>
                            <tr className="text-center">
                                <th>ID</th><th colSpan={2}>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>

                            
                            

                                    
                                
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
   
                export default Categorias;
