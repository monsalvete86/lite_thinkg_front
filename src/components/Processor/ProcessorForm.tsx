import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as ProcessorService from "../../services/processor.service"
import { useParams } from "react-router";
import IProcessor from "../../types/processor.type";

const ProcessorForm: React.FC = () => {
    const { id } = useParams();

    const initialValues = {
        id: null,
        processorName: ""
    }
    const [processorProperties, setProcessorProperties] = useState<IProcessor>(initialValues)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (id)
            console.log(id);
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProcessorProperties({ ...processorProperties, [name]: value });
    };

    const saveProcessor = () => {
        ProcessorService.create(processorProperties)
            .then((response: any) => {
                console.log(response.data);
                setErrorMessage("")
            })
            .catch((e) => {
                console.log(e.response);
                setErrorMessage(e.response.data.message)
            });
    }

    return (
        <form className="form" action="">
            <div className="form-group">
                <label htmlFor="processorName">Procesadora</label>
                <input
                    type="processorName"
                    className="form-control"
                    id="processorName"
                    name="processorName"
                    placeholder="Nombre de la procesadora"
                    value={processorProperties.processorName}
                    onChange={handleInputChange}
                />
            </div>
            <span className="text-danger">
                {errorMessage}
            </span>
            <div className="form-group">
                <button type="button" className="btn btn-success" title="Crear Producto" onClick={saveProcessor}> Guardar procesadora</button>
            </div>
        </form>
    );
}

export default ProcessorForm;