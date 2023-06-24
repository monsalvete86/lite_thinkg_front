import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as SubscriptionService from "../../services/subscription.service";
import ISubscription from '../../types/subscription.type';
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer"
import IClientDailyList from "../../types/client-daily-list.type";

const Subscriptions: React.FC = () => {

    const [subscriptions, setSubscriptions] = useState<Array<IClientDailyList>>([]);
    const [currentSubscription, setCurrentSubscription] = useState<ISubscription | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchSubscription, setSearchSubscriptions] = useState<string>("");
    const [showConfirm, setShowConfirm] = useState(false);

    const subscriptionsRef = useRef();
    console.log("process.env");
    // subscriptionsRef.current = subscriptions;

    useEffect(() => {
        retrieveSubscriptions();
    }, []);

    const retrieveSubscriptions = () => {
        SubscriptionService.getAll()
            .then((response) => {
                setSubscriptions(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveSubscriptions();
    };

    const setActiveSubscription = (subscription: ISubscription, index: number) => {
        setCurrentSubscription(subscription);
        setCurrentIndex(index);
    };

    const cleanSubscription = (id: number | null | undefined) => {
        const confirmation = window.confirm("¿Está seguro de que desea eliminar este subscription?");
        if (confirmation) {
            SubscriptionService.remove(id);
            retrieveSubscriptions();
        }
    };

    return (
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2>Subscriptions Stock</h2>
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
                                to={"/subscriptions/new"}
                                className="ml-2 btn btn-primary"
                            >
                                New
                            </Link>

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

