import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as UserService from "../../services/user.service";
import IUser from '../../types/user.type';
import { Link } from "react-router-dom";

const Users: React.FC = () => {

    const [users, setUsers] = useState<Array<IUser>>([]);
    const [currentProduct, setCurrentProduct] = useState<IUser | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    const usersRef = useRef();

    useEffect(() => {
        retrieveUsers();
    }, []);

    const retrieveUsers = () => {
        UserService.getAll()
            .then((response) => {
                setUsers(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveUsers();
    };

    const setActiveProduct = (product: IUser, index: number) => {
        setCurrentProduct(product);
        setCurrentIndex(index);
    };

    const cleanProduct = (id: number | null | undefined) => {
        const confirmation = window.confirm("¿Está seguro de que desea eliminar este product?");
        if (confirmation) {
            console.log(id);
            // UserService.remove(id);
            retrieveUsers();
        }
    };

    return (
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2 className="text-primary">Lista de usuarios</h2>
                </div>
            </div>
            <div className="list row">
                <div className="col-md-12">
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
                                to={"/users/new"}
                                className="ml-2 btn btn-primary"
                            >
                                Nuevo
                            </Link>
                            {/* <PDFDownloadLink document={<ReportPDF users={users}/>} fileName="report.pdf">
                                <button className="ml-2 btn btn-danger">
                                    Dowload PDF
                                </button>
                            </PDFDownloadLink> */}
                        </div>
                    </div>
                </div>
                <div className="col-md-12 list">
                    <table
                        className="table table-striped table-bordered">
                        <thead>
                            <tr className="text-center">
                                <th>Id</th><th>Username</th><th>email</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users &&
                                users.map((row, index) => {
                                    return (
                                        <tr key={row.id}>
                                            <td className="text-center">{row.id}</td><td className="text-center">{row.username}</td>
                                            <td className="text-center">{row.email}</td>
                                            <td className="text-center">
                                                <Link to={"/users/" + row?.id} className="btn btn-primary">Editar</Link>
                                            </td>
                                            {/* <td className="text-center">
                                  <button onClick={() => cleanProduct(row.id)} className="btn btn-danger">Eliminar</button>
                              </td> */}
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

export default Users;

