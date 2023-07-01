import React, { useState, useEffect, ChangeEvent } from "react";
import * as ClientDailyListService from "../../services/client-daily-list.service";
import * as UserService from "../../services/user.service";
import * as ClienteService from "../../services/cliente.service";
import * as SubscriptionService from "../../services/subscription.service";
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
  const [errorMessage, setErrorMessage] = useState(false)
  const [dataList, setDataList] = useState<Array<IClientDailyList>>([]);
  const [filterClient, setFilterClient] = useState('');


  useEffect(() => {
    retrieveUsers()
    retrieveItems();
  }, []);

  useEffect(() => {
    retrieveClientes();
  }, [filterClient]);

  useEffect(() => {
    retrieveClientes()
  }, [dataList]);


  const retrieveItems = () => {
    ClientDailyListService.getAllByDailyList(state.dailyListId)
      .then((response) => {
        setDataList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createDailyList = () => {
    ClientDailyListService.createBulk(dataList)
      .then((response) => {
        console.log(response)
        retrieveItems()
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const retrieveClientes = async () => {
    try {
      const listClient = dataList.map(item => item.clientId);
      const response = await ClienteService.getAllByQuery(filterClient, { list: listClient });
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

  const removeSubscription = (id: number) => {
    const confirmation = window.confirm("¿Está seguro de que desea eliminar este product?");
    if (confirmation) {
      SubscriptionService.remove(id);
      retrieveItems();
    }
  }

  const handleAddData = (clients: any, users: any) => {
    setErrorMessage(false)

    if (!users.value) {
      users.className += (' is-invalid');
      return false;
    } else {
      users.classList.remove("is-invalid")
    };

    let user = JSON.parse(users.value)

    let exists = dataList.filter(value => {
      if (value.clientId === clients.id && value.operatorId === user.id) {
        setErrorMessage(true)
        return value;
      }
    })

    if (exists.length) return false
    let items = {
      clientId: Number(clients.id),
      operatorId: user.id,
      dailyListId: Number(state.dailyListId),
      cliente: {
        nombre: clients.nombre,
        apellido: clients.apellido
      },
      user: {
        username: user.username
      }
    }
    setDataList([...dataList, items]);
    window.alert('Lista guardada correctamente')
  };

  return (
    <div>
      {errorMessage && <div className="alert alert-secondary" role="alert">
        Ya se ha creado un registro similar previamente, seleccione otra opción
      </div>}
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
                  <td>{item.state}</td>
                  <td>
                    {((item.state === 'GENERATED' || item.state === null) && item.id) &&
                      <button disabled={item.state !== 'GENERATED' && item.state !== null} className="btn btn-danger" onClick={() => removeSubscription(Number(item.id))}>Remover</button>}

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
