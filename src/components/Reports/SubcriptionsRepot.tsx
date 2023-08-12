import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import * as SubscriptionService from "../../services/subscription.service";
import { Link } from "react-router-dom";
import IClientDailyList from "../../types/client-daily-list.type";
import states from "../../common/state-subscription";


//define la estructura de los filtros que se pueden aplicar a las suscripciones.
interface subscriptionFilters {
  state?: any;
  // cliente?: string;
}

//representa el estado inicial de los filtros de suscripción.
//En este caso, solo contiene el filtro state con un valor vacío.
const initialState: subscriptionFilters = {
  state: ''
  //client: ''
}

//muestra un informe de suscripciones y proporciona interacciones.
const SubcriptionsReport: React.FC = () => {

  const [subscriptions, setSubscriptions] = useState<Array<IClientDailyList>>([]); //Almacena un array de objetos de suscripciones. Se inicializa con un array vacío.
  const [filtersSuscription, setFiltersSuscription] = useState(initialState); //Almacena los filtros de suscripción. Se inicializa con el valor de initialState.

  //Se utiliza para ejecutar una acción al montar el componente
  useEffect(() => {
    console.log('llega')
    retrievePaymentSubscriptions('state', '');
    console.log('Pasa')
  }, []);

  //Una función que toma un nombre y un valor como argumentos para filtrar las suscripciones. 
  //Realiza una llamada a la API usando el servicio SubscriptionService y actualiza el estado de las suscripciones con la respuesta.
  const retrievePaymentSubscriptions = (name?: any, value: any = '') => {
    console.log('value')
    console.log(value)
    let data = {
        [name]: value
    }
    SubscriptionService.getAll(data)
      .then((response) => {
          console.log(response)
          setSubscriptions(response.data);
      })
      .catch((e) => {
          console.log(e);
      });
  };

  const cleanSubscription = (id: number | null | undefined) => {
      const confirmation = window.confirm("¿Está seguro de que desea eliminar este subscription?");
      if (confirmation) {
          SubscriptionService.remove(id);
          // retrievePaymentSubscriptions();
      }
  };

  //que maneja el cambio en el input de selección de estado.
  //Llama a retrievePaymentSubscriptions con el nombre y el valor seleccionados para aplicar el filtro.
  const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log('name = ' + name + ' / value = ' + value);
    retrievePaymentSubscriptions(name, value);
    // setSubscription({ ...subscription, [name]: value });
    // validateFields(subscription)
  };

  //Una función que toma una fecha en formato de cadena y la convierte en una cadena en formato de fecha legible.
  const formatDate = (date: string) => {
      return new Date(date).toISOString().split('T')[0]
  }

  return (
    <div>
        <div className="row">
            <div className="col-md-12">
                <h3 className="h3 text-center font-weight-bold">Reporte Suscripciones</h3>
            </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="state">Estado de suscripción</label>
            <div className="input-group mb-3">
              <select name="state" id="state" className="custom-select" onChange={handleNameChange}>
                <option value="">--Seleccionar -- </option>
                {states.map((state) => (
                    <option value={state.value} key={state.value} >{state.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-100 list mt-5 table-responsive">
          <table
            className="table table-striped table-bordered table-sm w-100">
            <thead>
              <tr className="text-center">
                <th>Code</th>
                <th>Cliente</th>
                <th>Pago Mensual</th>
                <th>Fecha próximo pago</th>
                <th>Estado</th>
                <th>Lista diaria</th>
                {/*<th colSpan={2}>Acciones</th>*/}
              </tr>
            </thead>
            <tbody>
              {
                subscriptions &&
                subscriptions.map((row, index) => {
                  return (
                    <tr key={row.id}>
                        <td className="text-center">{row.id}</td>
                        <td className="text-center">{row.cliente?.nombre} {row.cliente?.apellido}</td>
                        <td className="text-center">{row.monthlyPayment}</td>
                        <td className="text-center">{row.nextPaymentDate ? formatDate(row.nextPaymentDate) : ""}</td>
                        <td>{row.state ?? "GENERATED"}</td>
                        <td className="text-center">{row.dailyListId}</td>
                        {/*<td className="text-center">
                            <Link to={"/subscription/" + row?.id} className="btn btn-primary">Editar</Link>
                        </td>
                        <td className="text-center">
                            <button onClick={() => cleanSubscription(row.id)} className="btn btn-danger">Borrar</button>
                        </td>*/}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default SubcriptionsReport;

