import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as UserService from "../../services/user.service";
import IUser from "../../types/user.type";

type MyProps = {
    id?: number | string,
}

const UserForm: React.FC<MyProps> = (props) => {
    const { id } = useParams() ?? props.id;

    const initialUserState: IUser = {
        id: 0,
        username: '',
        name: '',
        last_name: '',
        email: '',
        password: '',
        companyId: 1,
    };

    const [user, setUser] = useState(initialUserState);
    const [isLoading, setIsLoading] = useState(false)
    const [banEdit, setBanEdit] = useState<number>(0);
    let navigate = useNavigate();


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        if (id) {
            UserService.getUserById(id)
                .then((result: any) => {
                    setBanEdit(result.id)
                    setUser(result);
                })
        }
    }, []);

    const saveUser = () => {
        setIsLoading(true)
        var data = user;
        console.log(user)

        if (!user?.id || user?.id === null) {

            UserService.create(data)
                .then((response: any) => {
                    console.log(response.data);
                    setIsLoading(false)
                    navigate("/users");
                    window.location.reload();
                })
                .catch((e: Error) => {
                    console.log(e);
                    setIsLoading(false)
                });
        } else {
            UserService.update(user.id, data)
                .then((response: any) => {
                    setIsLoading(false)
                    console.log(response.data);
                    navigate("/users");
                    window.location.reload();
                })
                .catch((e: Error) => {
                    setIsLoading(false)
                    console.log(e);
                });
        }

    };

    return (
        <div className="submit-form">
            <div>
              <h5 className="h5 w-100 text-center">  {!user.id ? 'Nuevo usuario' : 'Editar Usuario'}</h5>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        required
                        value={user.username}
                        onChange={handleInputChange}
                        name="username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={user.name || ''}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        required
                        value={user.last_name || ''}
                        onChange={handleInputChange}
                        name="last_name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        value={user.email}
                        onChange={handleInputChange}
                        name="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={user.password}
                        onChange={handleInputChange}
                        name="password"
                    />
                </div>

                {!isLoading && (<div className="modal-footer">
                    <button className="btn btn-success" onClick={saveUser}>Guardar</button>
                    <Link
                        data-dismiss="modal"
                        to={"/users"}
                        className="ml-2 btn btn-secondary"
                    >
                        Cancelar
                    </Link>
                </div>)}
                {isLoading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <h5>Guardando</h5>
                    </div>
                )

                }
            </div>
        </div>
    );

}

export default UserForm;
