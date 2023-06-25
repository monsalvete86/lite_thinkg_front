import React, { useState, useEffect, ChangeEvent } from "react";
import * as ClienteService from "../services/cliente.service";
import ICliente from '../types/cliente.type';
import { Link } from "react-router-dom";
import ReportPDF from "./ReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Array<ICliente>>([]);
  const [currentCliente, setCurrentCliente] = useState<ICliente | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchCliente, setSearchClientes] = useState<string>("");

  useEffect(() => {
    retrieveClientes();
  }, []);

  const retrieveClientes = () => {
    ClienteService.getAll()
      .then((response) => {
        setClientes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveClientes();
  };

  const setActiveCliente = (cliente: ICliente, index: number) => {
    setCurrentCliente(cliente);
    setCurrentIndex(index);
  };

  const cleanCliente = (id: number | null | undefined) => {
    const confirmation = window.confirm("¿Está seguro de que desea eliminar este cliente?");
    if (confirmation) {
      console.log(id);
      ClienteService.remove(id);
      retrieveClientes();
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchClientes(searchValue);
  };

  const filteredClientes = clientes.filter((cliente) => {
    return (
      cliente.nombre.toLowerCase().includes(searchCliente.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(searchCliente.toLowerCase())
    );
  });

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Clientes</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-8"></div>
        <div className="col-md-8">
          <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search by name or last name" value={searchCliente} onChange={handleSearch} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Search</button>
              <Link to={"/clientes/new"} className="ml-2 btn btn-primary">New</Link>
              <PDFDownloadLink document={<ReportPDF clientes={filteredClientes} />} fileName="report.pdf">
                <button className="ml-2 btn btn-danger">Download PDF</button>
              </PDFDownloadLink>
            </div>
          </div>
        </div>
          <div className="col-md-12 list">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono</th>
                  <th>Direccion</th>
                  <th>Ciudad</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map((row, index) => {
                  return (
                    <tr key={row.id}>
                      <td className="text-center">{row.nombre}</td>
                      <td className="text-center">{row.apellido}</td>
                      <td className="text-center">{row.telefono}</td>
                      <td className="text-center">{row.direccion}</td>
                      <td className="text-center">{row.ciudad}</td>
                      <td className="text-center">
                        <Link to={"/clientes/" + row?.id} className="btn btn-primary">Edit</Link>
                      </td>
                      <td className="text-center">
                        <button onClick={() => cleanCliente(row.id)} className="btn btn-danger">Delete</button>
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

export default Clientes;

