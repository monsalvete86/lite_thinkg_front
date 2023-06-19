import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as ProductService from "../services/product.service";
import IProduct from '../types/product.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer"

const Products: React.FC = () => {
    
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchProduct, setSearchProducts] = useState<string>("");
    const [showConfirm, setShowConfirm] = useState(false);
    
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

    const cleanProduct = (id: number | null | undefined) => {
        console.log(id)
        ProductService.remove(id);
        retrieveProducts();
    };

    const handleDeleteClick = () => {
      setShowConfirm(true);
    };
  
    const handleConfirm = () => {
      // Perform deletion logic using itemId
      setShowConfirm(false);
    };
  
    const handleCancel = () => {
      setShowConfirm(false);
    };

    return (
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2>Products Stock</h2>
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
                            <PDFDownloadLink document={<ReportPDF products={products}/>} fileName="report.pdf">
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
                                <th>Code</th><th>Product Name</th><th>Stock</th><th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            
                            {
                                products &&
                                products.map((row, index) => {
                                    return (
                                        <tr key={row.id}>
                                            <td>{row.code}</td><td>{row.productName}</td>
                                            <td className="text-right">{row.stock}</td>
                                            <td className="text-center">
                                                <Link
                                                    to={"/products/" + row?.id}
                                                    className="btn btn-primary"
                                                >
                                                    Edit
                                                </Link>
                                                                                    
                                            </td>
                                            <td className="text-center">
                                                <button onClick={() => cleanProduct(row.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                            <td>
                                              <div>
                                                <button className="btn btn-danger" onClick={handleDeleteClick}>
                                                  Delete
                                                </button>

                                                {showConfirm && (
                                                  <div className="modal" role="dialog">
                                                    <div className="modal-dialog" role="document">
                                                      <div className="modal-content">
                                                        <div className="modal-header">
                                                          <h5 className="modal-title">Confirm Deletion</h5>
                                                          <button type="button" className="close" onClick={handleCancel}>
                                                            <span aria-hidden="true">&times;</span>
                                                          </button>
                                                        </div>
                                                        <div className="modal-body">
                                                          Are you sure you want to delete?
                                                        </div>
                                                        <div className="modal-footer">
                                                          <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={handleCancel}
                                                          >
                                                            Cancel
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={handleConfirm}
                                                          >
                                                            Delete
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            </td>
                                            
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

export default Products;

