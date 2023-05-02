import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as CategoriasService from "../services/categoria.service";
import ICategoria from "../types/categoria.type";
import { getCurrentUser } from "../services/auth.service";


const CategoriaForm: React.FC = () => {
    const currentUser = getCurrentUser();
    const { id }= useParams();
    let navigate = useNavigate();

    const initialCategoriaState = {
        id: null,
        categoriaName: "",
        code: "",
        stock: 0,
        companyId: -1
    };

    const [categoria, setCategoria] = useState(initialCategoriaState);
    const [banEdit, setBanEdit] = useState<number> (0);
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCategoria({ ...categoria, [name]: value });
    };
    
    const getCategoria = (id: string) => {
        CategoriasService.get(id)
        .then((response: any) => {
            setCategoria(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };
    
    useEffect(() => {
        if (id) {
            CategoriasService.get(id)
            .then((result: any) => {
                setBanEdit(result.data.id)
                setCategoria(result.data);
            })
        }
    }, []);
    
    const saveCategoria = () => {
        var data = {
            categoriaName: categoria.categoriaName,
            code: categoria.code,
            stock: categoria.stock,
            companyId: getCurrentUser().companyId
        };

        if(!categoria.id || categoria?.id === null) {

            CategoriasService.create(data)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        } else {
            CategoriasService.update(categoria.id, data)
            .then((response: any) => {
                console.log("data ")
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        }

        navigate("/categorias");
        window.location.reload();
    };

    useEffect(() => {
        if (id)
            getCategoria(id);
    }, [id]);
    
    return (
        <div className="submit-form">
            <div>
                
                {categoria?.id && `Current Categoria ${categoria.code} - ${categoria.categoriaName}`}
                {!categoria?.id && 'New Categoria'}
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="code"
                        required
                        value={categoria.code}
                        onChange={handleInputChange}
                        name="code"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoriaName">Categoria Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="categoriaName"
                        required
                        value={categoria.categoriaName}
                        onChange={handleInputChange}
                        name="categoriaName"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="text"
                        className="form-control"
                        id="stock"
                        required
                        value={categoria.stock}
                        onChange={handleInputChange}
                        name="stock"
                    />
                </div>
                <button className="btn btn-success" onClick={saveCategoria}>Save</button>
                <Link
                    to={"/categorias" }
                    className="ml-2 btn btn-secondary"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
    
}

export default CategoriaForm;