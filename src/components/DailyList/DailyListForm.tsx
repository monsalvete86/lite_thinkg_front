import React, { useState, ChangeEvent, useEffect } from "react";
import IDailyList from "../../types/dailyList.type";
import { getCurrentUser } from "../../services/auth.service";
import { useParams } from "react-router";

import * as DailyListService from "../../services/daily-list.service"

const DailyListForm: React.FC = () => {

    const currentUser = getCurrentUser();
    const { id } = useParams();

    const initialValues = {
        id: null,
        userId: currentUser.id,
        date: "",
        status: false
    }
    const [dailyListProperties, setDailyListProperties] = useState<IDailyList>(initialValues)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (id)
            console.log(id);
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDailyListProperties({ ...dailyListProperties, [name]: value });
    };

    const saveDailyList = () => {
        DailyListService.create(dailyListProperties)
            .then((response: any) => {
                console.log(response.data);
                setErrorMessage("")
            })
            .catch((e) => {
                console.log(e.response);
                console.log(e.response.data.message);
                setErrorMessage(e.response.data.message)
            });
    }

    return (
        <form className="form" action="">
            <div className="form-group">
                <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    placeholder="Nombre del producto"
                    value={dailyListProperties.date}
                    onChange={handleInputChange}
                />

            </div>
            <span className="text-danger">
                {errorMessage}
            </span>
            <div className="form-group">
                <button type="button" className="btn btn-success" title="Crear Producto" onClick={saveDailyList}>Crear Listado</button>
            </div>
        </form>
    );
};

export default DailyListForm;