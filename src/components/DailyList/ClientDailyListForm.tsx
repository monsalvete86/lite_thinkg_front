import React, { useState, useEffect } from "react";
import * as ClientDailyListService from "../../services/client-daily-list.service";
import * as ClienteService from "../../services/cliente.service";
import ICliente from '../../types/cliente.type';
import IClientDailyList from "../../types/client-daily-list.type";

import Select from 'react-select';
import { useLocation } from "react-router-dom";

type Props =
  { dailyListId?: null }

const ClientDailyListForm: React.FC<Props> = (props: Props) => {

  let { state } = useLocation();

  const [selectedOption, setSelectedOptions] = useState<string>();
  const [clientes, setClientes] = useState<Array<ICliente>>([]);
  const [dataList, setDataList] = useState<Array<IClientDailyList>>([]);

  useEffect(() => {
    retrieveClientes(); 
    retrieveItems();
  }, []);


  const retrieveItems = () => {
    ClientDailyListService.getAllByDailyList(state.dailyListId)
      .then((response) => {
        setDataList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSelectChange = (e: any) => {
    setSelectedOptions(e.target.value);
  };

  const addClient = () => {
    if (selectedOption) {
      let data = JSON.parse(selectedOption)
      let items = {
        clientId: Number(data.id),
        operatorId: 1,
        dailyListId: Number(state.dailyListId)
      }
      setDataList(newData => [...newData, items])
      setSelectedOptions(undefined);
    }
  };

  const retrieveClientes = () => {
    ClienteService.getAll()
      .then((response) => {
        setClientes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendOperator = (index: number, value: string) => {
    setDataList((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index]['operatorId'] = Number(value);
      return updatedProducts;
    });
  }

  const createDailyList = () => {
    console.log(dataList)
    ClientDailyListService.createBulk(dataList)
      .then((response) => {
        // set(response.data);c
        console.log(response)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const deleteClient = () => { }

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Crear listado diario {state.dailyListId}</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-10">
          <div className="input-group mb-3">
            {/* <Select options={clientes} value={selectedOption} name="selectedOptions" onChange={handleSelectChange} className="w-100"
            /> */}

            <select value={selectedOption} className="custom-select w-100" id="selectedOption" name="selectedOption" onChange={handleSelectChange} >
              {clientes.map((item, index) => (
                <option value={JSON.stringify(item)} key={item.id} >{item.nombre} {item.apellido}</option>
              ))}
            </select>
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
            <tbody>
              {dataList.map((item, index) => (
                <tr key={index}>
                  <td  >  </td>
                  <td>
                    <select className="custom-select" name="operatorId" id="operatorId" onChange={(e) => sendOperator(index, e.target.value)}>
                      <option value="1" >Cristhiam Monsalve </option>
                      <option value="2">Pepito Monsalve </option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-danger">Remover</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>

          <button className="btn btn-outline-primary btn-block" type="button" onClick={createDailyList}>
            Crear lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDailyListForm;
