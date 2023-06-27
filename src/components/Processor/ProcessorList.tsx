import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as ProcessorService from "../../services/processor.service";
import IProcessor from '../../types/processor.type';
import { Link } from "react-router-dom";

const Processor: React.FC = () => {

    const [processors, setProcessors] = useState<Array<IProcessor>>([]);

    useEffect(() => {
        retrieveProcessors();
    }, []);

    const retrieveProcessors = () => {
        ProcessorService.getAll()
            .then((response) => {
                setProcessors(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };



    const cleanProcessor = (id: number | null | undefined) => {
        const confirmation = window.confirm("¿Está seguro de que desea eliminar este processor?");
        if (confirmation) {
            console.log(id);
            ProcessorService.remove(id);
            retrieveProcessors();
        }
    };

    return (
        <div>
            <div className="list row">
                <div className="col-md-12">
                    <h2>Procesadoras</h2>
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
                                to={"/processors/new"}
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
                                <th>Processor </th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                processors &&
                                processors.map((row, index) => {
                                    return (
                                        <tr key={row.id}>
                                            <td className="text-center">{row.id}</td>
                                            <td className="text-center">{row.processorName}</td>
                                            <td className="text-center">
                                                <Link to={"/processors/" + row?.id} className="btn btn-primary">Edit</Link>
                                            </td>
                                            <td className="text-center">
                                                <button onClick={() => cleanProcessor(row.id)} className="btn btn-danger">Delete</button>
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

export default Processor;

