import React, { useState, useEffect, ChangeEvent, MouseEventHandler } from "react";
import * as DailyListService from "../../services/daily-list.service";
import IDailyList from "../../types/dailyList.type";
import { Link } from "react-router-dom";
import DailyListForm from "./DailyListForm";


const DailyLists: React.FC = () => {

  const today = () => {
    return new Date().toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
  }

  const [dailyList, setProducts] = useState<Array<IDailyList>>([]);
  const [searchFrom, setSearchFrom] = useState<string>(today());
  const [searchTo, setSearchTo] = useState<string>(today());
  const [showModal, setShowModal] = useState(false);
  const [errorResponseMessage, setErrorResponseMessage] = useState("");
  const [showErrorResponseMessage, setShowErrorResponseMessage] = useState(false);


  useEffect(() => {
    retrieveItems();
  }, []);

  const retrieveItems = () => {

    let params = {
      from: searchFrom,
      to: searchTo
    }

    DailyListService.getAll(params)
      .then((response) => {
        setProducts(response.data);
        setShowModal(false)
      })
      .catch((e) => {
        console.log(e);
      });

  };

  const removeItem = (id: number | null | undefined) => {
    DailyListService.remove(id).then((response) => {
      setTimeout(() => {
        setShowErrorResponseMessage(false)
        setErrorResponseMessage(response.data.message)
      }, 3000)
      setShowErrorResponseMessage(true)
      setErrorResponseMessage("")
    }

    );
    retrieveItems();
  };

  const handleFromChange = (text: ChangeEvent<HTMLInputElement>) => {
    console.log(text)
    setSearchFrom(text.target.value);
  };
  const handleToChange = (text: ChangeEvent<HTMLInputElement>) => {
    console.log(text)
    setSearchTo(text.target.value);
  };

  const isActiveModal = (isShow: boolean = false) => {
    setShowModal(isShow)
  }

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2 className="h2 text-primary font-weight-bold">Listado diario</h2>
        </div>
      </div>
      {/* <div className="d-flex justify-content-center col-md-12 text-primary">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <h5 className="h5 font-weight-bold p-2">Cargando</h5>
      </div> */}

      {showErrorResponseMessage && <div className="alert alert-danger  position-fixed fixed-top" style={{ zIndex: 1 }} role="alert">
        {errorResponseMessage}
      </div>}

      <div className="page_search my-2  w-100">
        <div className="form-row w-100">
          <div className="form-group col-md-5">
            <label >Desde</label>
            <input type="date" value={searchFrom} className="form-control" id="search_from" onChange={handleFromChange} />
          </div>
          <div className="form-group col-md-5">
            <label >Hasta</label>
            <input type="date" value={searchTo} className="form-control" id="search_to" onChange={handleToChange} />
          </div>
          <div className="form-group col-md-2 d-flex align-items-end">
            <button
              className="btn btn-block btn-outline-secondary"
              type="button"
              onClick={retrieveItems}
            >
              Buscar
            </button>
          </div>
        </div>
        <div className="w-100 justify-content-end d-flex">

          <button type="button" className="btn btn-primary" data-target="#modalCreateDailyList" onClick={() => isActiveModal(true)}>
            Nuevo
          </button>
          {showModal && <DailyListForm reloadList={retrieveItems} isOpenModal={(hide) => isActiveModal(hide)} ></DailyListForm>}

        </div>
      </div>
      <div className="list row">
        <div className="col-md-12 list table-responsive">
          <table className="table table-striped table-bordered table-sm w-100">
            <thead>
              <tr className="text-center">
                <th>Usuario</th>
                <th>Fecha registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dailyList &&
                dailyList.map((row, index) => {
                  return (
                    <tr key={row.id}>
                      <td className="text-center">{row.user.username}</td>
                      <td className="text-center">{row.date}</td>
                      <td className="text-center mr-2">
                        {row.date === today() && <Link
                          to={`/clientDailyList/${row.id}`}
                          state={{ 'dailyListId': row.id, 'date': row.date }}
                          className="btn btn-primary"
                        >
                          Editar
                        </Link>}
                        <button className="btn btn-danger" onClick={() => removeItem(row.id)}>Eliminar</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailyLists;
