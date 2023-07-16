import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as SubscriptionService from "../../services/subscription.service";
import { Link } from "react-router-dom";
import IClientDailyList from "../../types/client-daily-list.type";
import states from "../../common/state-subscription";

const Subscriptions: React.FC = () => {

    const [subscriptions, setSubscriptions] = useState<Array<IClientDailyList>>([]);
    const [searchStateSubscription, setSearchStateSubscription] = useState("");
    const [searchStatePayment, setSearchStatePayment] = useState("");

    useEffect(() => {
        retrieveSubscriptions();
    }, []);

    const retrieveSubscriptions = () => {
        let data = {
            state: searchStateSubscription
        }
        SubscriptionService.getAll(data)
            .then((response) => {
                setSubscriptions(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const retrievePaymentSubscriptions = () => {
        let data = {
            state: searchStatePayment
        }
        SubscriptionService.getAllPayments(data)
            .then((response) => {
                setSubscriptions(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const cleanSubscription = (id: number | null | undefined) => {
        const confirmation = window.confirm("¿Está seguro de que desea eliminar este subscription?");
        if (confirmation) {
            SubscriptionService.remove(id);
            retrieveSubscriptions();
        }
    };

    const handleStateSubscriptionChange = (text: ChangeEvent<HTMLSelectElement>) => {
        setSearchStateSubscription(text.target.value);
    };

    const handleStatePaymentChange = (text: ChangeEvent<HTMLSelectElement>) => {
        setSearchStatePayment(text.target.value);
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="h2 text-primary">Suscripciones</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="stateSubscription">Estado de suscripción</label>
                    <div className="input-group mb-3">
                        <select name="stateSubscription" id="stateSubscription" className="custom-select" onChange={handleStateSubscriptionChange}>
                            <option value="">--Seleccionar -- </option>
                            {states.map((state) => (
                                <option value={state.value} key={state.value} >{state.label}</option>
                            ))}
                        </select>
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-success"
                                type="button"
                                onClick={retrieveSubscriptions}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="stateSubscription">Estado de pagos</label>
                    <div className="input-group-append">
                        <select name="statePayment" id="statePayment" className="custom-select" onChange={handleStatePaymentChange}>
                            <option value="PAGADO">--Seleccionar -- </option>
                            <option value="PAGADO">Pagados  </option>
                            <option value="CANCELADO">Cancelados  </option>
                            <option value="PORVENCER">Proximos a vencer  </option>
                        </select>
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={retrievePaymentSubscriptions}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-100 list mt-5">
                <table
                    className="table table-striped table-bordered">
                    <thead>
                        <tr className="text-center">
                            <th>Code</th>
                            <th>Cliente</th>
                            <th>Estado</th>
                            <th>Lista diaria</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subscriptions &&
                            subscriptions.map((row, index) => {
                                return (
                                    <tr key={row.id}>
                                        <td className="text-center">{row.id}</td>
                                        <td className="text-center">{row.cliente?.nombre} {row.cliente?.apellido}</td>
                                        <td>{row.state ?? "GENERATED"}</td>
                                        <td className="text-center">{row.dailyListId}</td>
                                        <td className="text-center">
                                            <Link to={"/subscription/" + row?.id} className="btn btn-primary">Editar</Link>
                                        </td>
                                        <td className="text-center">
                                            <button onClick={() => cleanSubscription(row.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Subscriptions;

