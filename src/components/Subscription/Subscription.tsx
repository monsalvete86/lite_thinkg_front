import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as SubscriptionService from "../../services/subscription.service";
import { Link } from "react-router-dom";
import IClientDailyList from "../../types/client-daily-list.type";
import states from "../../common/state-subscription";

const Subscriptions: React.FC = () => {

    const [subscriptions, setSubscriptions] = useState<Array<IClientDailyList>>([]);
    const [searchState, setSearchState] = useState("");


    useEffect(() => {
        retrieveSubscriptions();
    }, []);

    const retrieveSubscriptions = () => {
        let data = {
            state: searchState
        }
        SubscriptionService.getAll(data)
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

    const handleStateChange = (text: ChangeEvent<HTMLSelectElement>) => {
        console.log(text)
        setSearchState(text.target.value);
      };

    return (
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2>Suscripciones</h2>
                </div>
            </div>
            <div className="list row">
                <div className="col-md-8">

                </div>
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <select name="state" id="state" className="custom-select" onChange={handleStateChange}>
                            <option value="ACEPTED">--Seleccionar -- </option>
                            {states.map((state) => (
                                <option value={state.value} key={state.value} >{state.label}</option>
                            ))}
                        </select>

                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={retrieveSubscriptions}
                            >
                                Buscar
                            </button>
                        </div>
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"

                            >
                                Próximas a vencer
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 list">
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
                                                <Link to={"/subscription/" + row?.id} className="btn btn-primary">Edit</Link>
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
        </div>
    );
}

export default Subscriptions;

