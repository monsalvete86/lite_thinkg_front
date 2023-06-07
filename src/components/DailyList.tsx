import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as DailyListService from "../services/dailyList.service";
import IDailyList from "../types/dailyList.type";
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const DailyLists: React.FC = () => {
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
  console.log("process.env");
  // productsRef.current = dailyList;

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    DailyListService.getAll()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Listado diario</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-8"></div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Search
              </button>
              <Link to={"/daily-list/new"} className="ml-2 btn btn-primary">
                New
              </Link>
              <PDFDownloadLink
                document={<ReportPDF dailyList={dailyList} />}
                fileName="report.pdf"
              >
                <button className="ml-2 btn btn-danger">Dowload PDF</button>
              </PDFDownloadLink>
            </div>
          </div>
        </div>
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
                      <td>{row.userId}</td>
                      <td>{row.createdAt}</td>
                      <td className="text-center">
                        <Link
                          to={"/clientDailyList"}
                          className="btn btn-primary"
                        >
                          Añadir
                        </Link>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-danger">Delete</button>
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
