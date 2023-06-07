import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as DailyListService from "../services/dailyList.service";
import IDailyList from "../types/dailyList.type";
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ClientDailyLists: React.FC = () => {
  const proList = [
    {
      id: 1,
      userId: 1,
      status: false,
      createdAt: "1202-02-12 00:00:00",
      updatedAt: "0000-00-00 00:00:00",
    },
    {
      id: 2,
      userId: 1,
      status: true,
      createdAt: "0000-00-00 00:00:00",
      updatedAt: "0000-00-00 00:00:00",
    },
    {
      id: 3,
      userId: 1,
      status: false,
      createdAt: "2012-12-02 02:01:00",
      updatedAt: "0000-00-00 00:00:00",
    },
  ];

  const [dailyList, setProducts] = useState<Array<IDailyList>>(proList);
  const productsRef = useRef();

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    return "Ok";
  };

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Crear listado diario</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-5">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar cliente"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar operador"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <button className="btn btn-outline-primary btn-block" type="button">
            Añadir
          </button>
        </div>
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Cliente</th>
                <th>Operador</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientDailyLists;
