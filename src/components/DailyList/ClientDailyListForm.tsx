import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as ClientDailyListService from "../../services/client-daily-list.service";
import Select from 'react-select';


const ClientDailyLists: React.FC = () => {

  const [selectedOptions, setSelectedOptions] = useState();
  const options = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    { value: 'opcion3', label: 'Opción 3' },
  ];

  const handleSelectChange = (selected: any) => {
    setSelectedOptions(selected.value);
    console.log(selectedOptions)
  };

  const addClient = () => {
  }

  const createDelete = () => {
  }

  const deleteClient = () => {}

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Crear listado diario</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-10">
          <div className="input-group mb-3">
            <Select options={options} onChange={handleSelectChange}/>
          </div>
        </div>

        <div className="col-md-2">
          <button className="btn btn-outline-primary btn-block" type="button" onClick={addClient}>
            Añadir
          </button>
        </div>
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Cliente</th>
                <th>Operador</th>
                <th colSpan={2}>Acciones</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>

          <button className="btn btn-outline-primary btn-block" type="button" onClick={addClient}>
            Crear lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDailyLists;
