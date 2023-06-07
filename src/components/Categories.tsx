import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as CategoryService from "../services/category.service";
import ICategory from '../types/category.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink} from "@react-pdf/renderer"

const Categories: React.FC = () => {
    
    const [categories, setCategories] = useState<Array<ICategory>>([]);
    const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchCategory, setSearchCategories] = useState<string>("");
    
    const categoriesRef = useRef();
    console.log("process.env");
    // categoriesRef.current = categories;
    
    useEffect(() => {
        retrieveCategories();
    }, []);

    const retrieveCategories = () => {
        CategoryService.getAll()
        .then((response) => {
            setCategories(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveCategories();
    };

    const setActiveCategory = (category: ICategory, index: number) => {
        setCurrentCategory(category);
        setCurrentIndex(index);
    };

    const cleanCategory = () => {
        setCurrentCategory(null);
        setCurrentIndex(-1);
    };
    

    return (
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2>Categories</h2>
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
                                to={"/categories/new"}
                                className="ml-2 btn btn-primary"
                            >
                                New
                            </Link>
                            <PDFDownloadLink document={<ReportPDF categories={categories}/>} fileName="report.pdf">
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
                                <th>Code</th><th>Category</th><th>Stock</th><th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            
                            {
                                categories &&
                                categories.map((row, index) => {
                                    return (
                                        <tr key={row.id}>
                                            <td>{row.code}</td><td>{row.categoryName}</td>
                                            <td className="text-right">{row.stock}</td>
                                            <td className="text-center">
                                                <Link
                                                    to={"/categories/" + row?.id}
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

export default Categories;

