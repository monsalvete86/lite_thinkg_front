import React, { useState, useEffect, ChangeEvent, useRef } from "react";
//import * as ProductService from "../services/product.service";
import IProduct from '../types/product.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer" 


const Categorias: React.FC = () => {
    /*
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchProduct, setSearchProducts] = useState<string>("");
    
    const productsRef = useRef();
    console.log("process.env");
    // productsRef.current = products;
    
    useEffect(() => {
        retrieveProducts();
    }, []);

    const retrieveProducts = () => {
        ProductService.getAll()
        .then((response) => {
            setProducts(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveProducts();
    };

    const setActiveProduct = (product: IProduct, index: number) => {
        setCurrentProduct(product);
        setCurrentIndex(index);
    };

    const cleanProduct = () => {
        setCurrentProduct(null);
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
                                to={"/products/new"}
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
