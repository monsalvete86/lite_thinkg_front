import React, { useState, useEffect, ChangeEvent } from "react";
import * as ClientDailyListService from "../../services/client-daily-list.service";
import * as UserService from "../../services/user.service";
import * as ClienteService from "../../services/cliente.service";
import ICliente from '../../types/cliente.type';
import IClientDailyList from "../../types/client-daily-list.type";
import { useLocation } from "react-router-dom";
import IUser from "../../types/user.type";
import { Link } from "react-router-dom";

type Props = {
  dailyListId?: null,
  date?: string | null
}

type List = {
  clientId: number | string,
  operatorId: number | string
}

const ClientDailyListForm: React.FC<Props> = (props: Props) => {

  let { state } = useLocation();

  const [selectedOption, setSelectedOptions] = useState<string>();
  const [clientes, setClientes] = useState<Array<ICliente>>([]);
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [selectionList, setSelectionList] = useState<Array<List>>()
  const [dataList, setDataList] = useState<Array<IClientDailyList>>([]);
  const [filterClient, setFilterClient] = useState('');


  useEffect(() => {
    // retrieveClientes();
    retrieveUsers()
    retrieveItems();
  }, []);

  useEffect(() => {
    retrieveClientes();
  }, [filterClient]);


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

  const handleSelectedOperator = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e)
    console.log(selectionList)
  }

  const addClient = () => {
    if (selectedOption) {
      let data = JSON.parse(selectedOption)
      let items = {
        clientId: Number(data.id),
        operatorId: 1,
        dailyListId: Number(state.dailyListId),
        cliente: {
          nombre: data.nombre,
          apellido: data.apellido
        }
      }
      console.log(items)

      setDataList(newData => [...newData, items])
      setSelectedOptions(undefined);
    }
  };

  const sendOperator = (index: number, value: string) => {
    setDataList((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index]['operatorId'] = Number(value);
      return updatedProducts;
    });
  }

  const createDailyList = () => {
    ClientDailyListService.createBulk(dataList)
      .then((response) => {
        // set(response.data);
        console.log(response)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const retrieveClientes = async () => {
    try {
      const response = await ClienteService.getAllByQuery(filterClient);
      const data = await response;
      setClientes(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveUsers = async () => {
    try {
      const response = await UserService.getAll();
      const data = await response;
      setUsers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchClient = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterClient(value);
  }

  const deleteClient = () => { }

  const handleAddData = (clients: any, users: any) => {

    if (!users.value) {
      users.className += (' is-invalid');
      return false;
    } else {
      users.classList.remove("is-invalid")
    };

    let user = JSON.parse(users.value)
    let items = {
      clientId: Number(clients.id),
      operatorId: user.id,
      dailyListId: Number(state.dailyListId),
      cliente: {
        nombre: clients.nombre,
        apellido: clients.apellido
      },
      user:{
        username:user.username
      }
    }
    setDataList([...dataList, items]);
  };

  return (
    <div>
      <div className="list row">
        <div className="col-md-12">
          <h2>Listado diario {state.date}</h2>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input type="text" className="form-control" value={filterClient} placeholder="Buscar cliente" onInput={searchClient} />
          </div>
          <div className="w-100 table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Operador</th>
                  <th>Añadir</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre} {item.apellido}</td>
                    <td>
                      <select required defaultValue="" className="custom-select w-100" id={"selectOperator" + index} name={"selectOperator" + index}  >
                        <option value="">--Seleccionar--</option>
                        {users.map((user) => (
                          <option value={JSON.stringify(user)} key={user.id} >{user.username}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleAddData((item), (document.getElementById('selectOperator' + index)))} className="btn btn-success">Añadir</button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Cliente</th>
                <th>Operador</th>
                <th>Estado</th>
                <th colSpan={2}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, index) => (
                <tr key={index}>
                  <td> {item.clientId} - {item.cliente?.nombre}  {item.cliente?.apellido} </td>
                  <td>
                    {item.operatorId} - {item.user.username}
                  </td>
                  <td>{item.state ?? 'GENERATED'}</td>
                  <td>
                    <button disabled={item.state != 'GENERATED'} className="btn btn-danger">Remover</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>

          <div className="row">
            <div className="col-6">
              <Link
                to={"/dailyList"}
                className="btn btn-outline-secondary btn-block"
              >
                Cancelar
              </Link>
            </div>
            <div className="col-6">
              <button className="btn btn-outline-primary btn-block" type="button" onClick={createDailyList}>
                Guardar lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDailyListForm;
