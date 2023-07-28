import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as ProductsService from "../services/product.service";
import IProduct from "../types/product.type";
import { getCurrentUser } from "../services/auth.service";


const ProductForm: React.FC = () => {
    const currentUser = getCurrentUser();
    const { id }= useParams();
    let navigate = useNavigate();

    const initialProductState = {
        id: null,
        productName: "",
        code: "",
        stock: 0,
        companyId: -1
    };

    const [product, setProduct] = useState(initialProductState);
    const [banEdit, setBanEdit] = useState<number> (0);
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };
    
    const getProduct = (id: string) => {
        ProductsService.get(id)
        .then((response: any) => {
            setProduct(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };
    
    useEffect(() => {
        if (id) {
            ProductsService.get(id)
            .then((result: any) => {
                setBanEdit(result.data.id)
                setProduct(result.data);
            })
        }
    }, []);

    const saveProduct = () => {
        var data = {
            productName: product.productName,
            code: product.code,
            stock: product.stock,
            companyId: getCurrentUser().companyId
        };

        if(!product?.id || product?.id === null) {

            ProductsService.create(data)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        } else {
            ProductsService.update(product.id, data)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        }

        navigate("/products");
        window.location.reload();
    };

    useEffect(() => {
        if (id)
            getProduct(id);
    }, [id]);

    return (
        <div className="submit-form">
            <div>
                {product?.id && `Current Product ${product.code} - ${product.productName}`}
                {!product?.id && 'New Product'}
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="code"
                        required
                        value={product.code}
                        onChange={handleInputChange}
                        name="code"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productName"
                        required
                        value={product.productName}
                        onChange={handleInputChange}
                        name="productName"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="text"
                        className="form-control"
                        id="stock"
                        required
                        value={product.stock}
                        onChange={handleInputChange}
                        name="stock"
                    />
                </div>
                <button className="btn btn-success" onClick={saveProduct}>Save</button>
                <Link
                    to={"/products" }
                    className="ml-2 btn btn-secondary"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
    
}

export default ProductForm;