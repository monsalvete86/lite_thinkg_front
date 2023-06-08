import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as CategoriesService from "../services/category.service";
import ICategory from "../types/category.type";
import { getCurrentUser } from "../services/auth.service";


const CategoryForm: React.FC = () => {
    const currentUser = getCurrentUser();
    const { id }= useParams();
    let navigate = useNavigate();

    const initialCategoryState = {
        id: null,
        categoryName: "",
        code: "",
        stock: 0,
        companyId: -1
    };

    const [category, setCategory] = useState(initialCategoryState);
    const [banEdit, setBanEdit] = useState<number> (0);
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };
    
    const getCategory = (id: string) => {
        CategoriesService.get(id)
        .then((response: any) => {
            setCategory(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };
    
    useEffect(() => {
        if (id) {
            CategoriesService.get(id)
            .then((result: any) => {
                setBanEdit(result.data.id)
                setCategory(result.data);
            })
        }
    }, []);
    
    const saveCategory = () => {
        var data = {
            categoryName: category.categoryName,
            code: category.code,
            stock: category.stock,
            companyId: getCurrentUser().companyId
        };

        if(!category?.id || category?.id === null) {

            CategoriesService.create(data)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        } else {
            CategoriesService.update(category.id, data)
            .then((response: any) => {
                console.log("data ")
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        }

        navigate("/categories");
        window.location.reload();
    };

    useEffect(() => {
        if (id)
            getCategory(id);
    }, [id]);
    
    return (
        <div className="submit-form">
            <div>
                
                {category?.id && `Current Category ${category.code} - ${category.categoryName}`}
                {!category?.id && 'New Category'}
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="code"
                        required
                        value={category.code}
                        onChange={handleInputChange}
                        name="code"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryName">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        required
                        value={category.categoryName}
                        onChange={handleInputChange}
                        name="categoryName"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="text"
                        className="form-control"
                        id="stock"
                        required
                        value={category.stock}
                        onChange={handleInputChange}
                        name="stock"
                    />
                </div>
                <button className="btn btn-success" onClick={saveCategory}>Save</button>
                <Link
                    to={"/categories" }
                    className="ml-2 btn btn-secondary"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
    
}

export default CategoryForm;