import React, { useState, ChangeEvent, useEffect } from "react";
import IDailyList from "../../types/dailyList.type";
import { getCurrentUser } from "../../services/auth.service";
import { useParams } from "react-router";
import * as DailyListService from "../../services/daily-list.service"

type Props = {
    reloadList: () => void,
    isOpenModal?: (hide:boolean) => void

}
const DailyListForm: React.FC<Props> = (props) => {

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
        props.reloadList()
    }

    const closeModal =() =>{
        props.isOpenModal?.(false)
    }

    return (
        <div>
            <div className="modal" id="modalCreateDailyList" tabIndex={-1} aria-labelledby="modalCreateDailyListLabel" style={{ display: 'block', backgroundColor: "#00000078" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalCreateDailyListLabel">Crear listado diario</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form" action="">
                                <div className="form-group">
                                    <label htmlFor="date">Fecha de la lista</label>
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

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                            <button type="button" className="btn btn-success" title="Crear Producto" onClick={saveDailyList}>Crear Listado</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DailyListForm;