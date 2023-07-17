import React, { useState, useEffect, ChangeEvent, MouseEventHandler } from "react";
import * as DailyListService from "../../services/daily-list.service";
import IDailyList from "../../types/dailyList.type";
import { Link } from "react-router-dom";
import ReportPDF from "../ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DailyListForm from "./DailyListForm";

const DailyLists: React.FC = () => {

  const today = () => {
    return new Date().toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
  }

  const [dailyList, setProducts] = useState<Array<IDailyList>>([]);
  const [searchFrom, setSearchFrom] = useState<string>(today());
  const [searchTo, setSearchTo] = useState<string>(today());
  const [showModal, setShowModal] = useState(false);

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
    DailyListService.remove(id);
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
          <h2  className="h2 text-primary font-weight-bold">Listado diario</h2>
        </div>
      </div>
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
          {showModal && <DailyListForm reloadList={retrieveItems} isOpenModal={(hide)=>isActiveModal(hide)} ></DailyListForm>}

        </div>
      </div>
      <div className="list row">
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Usuario</th>
                <th>Fecha registro</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dailyList &&
                dailyList.map((row, index) => {
                  return (
                    <tr key={row.id}>
                      <td>{row.user.username}</td>
                      <td>{row.date}</td>
                      <td className="text-center">
                        {row.date === today() && <Link
                          to={`/clientDailyList/${row.id}`}
                          state={{ 'dailyListId': row.id, 'date': row.date }}
                          className="btn btn-primary"
                        >
                          Editar
                        </Link>}
                      </td>
                      <td className="text-center">
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
