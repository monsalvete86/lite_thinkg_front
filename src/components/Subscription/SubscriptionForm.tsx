import React, { useState, ChangeEvent, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import * as ProcessorService from "../../services/processor.service";
import IProcessor from '../../types/processor.type';
import ISubscription from "../../types/subscription.type";
import *  as SubscriptionService from "../../services/subscription.service"
import AlertError from "../utils/AlertError";
import AlertSuccess from "../utils/AlertSuccess";

const SubscriptionForm: React.FC = () => {
  const { id } = useParams() ;
  const today = new Date().toISOString().split('T')[0];

  const initialState: ISubscription = {
    id: 0,
    migratoryProcess: "",
    annualIncome: 0,
    mainContributor: "",
    jobType: "",
    occupation: "",
    jointTaxes: "",
    whoClaimsTemplates: "",
    insurance: "",
    monthlyPremium: 0,
    maximumSpend: 0,
    annualDeductible: 0,
    genericDrug: 0,
    primaryDoctor: 0,
    medicalSpecialist: 0,
    emergencyRoom: 0,
    subsidy: 0,
    clientAnnotations: "",
    callcenterAnnotations: "",
    audio: "",
    state: "",
    startCoverage: today,
    endCoverage: "",
    processorId: 0,
    monthlyPayment: 0
  }
  const [subscription, setSubscription] = useState<ISubscription>(initialState);
  const [errorResponse, setErrorResponse] = useState(false)
  const [successResponse, setSuccessResponse] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showErrors, setShowErrors] = useState(false)


  useEffect(() => {
    if (id) {
      SubscriptionService.get(id)
        .then((result: any) => {
          setSubscription(result.data)
          validateFields(subscription)
        })

    }
  }, []);

  const validateFields =(subscription : ISubscription) => {
    if(!subscription.startCoverage || subscription.startCoverage === "0000-00-00") {
      setShowErrors(true)
      return false;
    }

    return true;
  }

  const saveSubscription = () => {
    if(!validateFields(subscription)){
      return false;
    }
    setLoading(true)
     
    SubscriptionService.update(subscription.id, subscription)
      .then((response: any) => {
        setTimeout(() => {
          setSuccessResponse(false)
        }, 3000)
        setSuccessResponse(true)
      })
      .catch((e: Error) => {
        console.log(e);
        setTimeout(() => {
          setErrorResponse(false)
        }, 3000)
        setErrorResponse(true)
      }).finally(() => {
        setLoading(false)
      });

  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSubscription({ ...subscription, [name]: value });
    validateFields(subscription)
  };

  const [processors, setProcessors] = useState<Array<IProcessor>>([]);

  useEffect(() => {
    retrieveProcessors();
  }, []);

  const retrieveProcessors = () => {
    ProcessorService.getAll()
      .then((response) => {
        setProcessors(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form className="form container">
      {errorResponse && <AlertError></AlertError>}
      {successResponse && <AlertSuccess></AlertSuccess>}
      <h5 className="w-100 text-center text-primary"> Completar suscripción</h5>

      <div className="row  border-right ">
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="monthlyPayment">Pago Mensual</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              placeholder="Pago mensual"
              id="monthlyPayment"
              name="monthlyPayment"
              value={subscription?.monthlyPayment}
              type="number"
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="migratoryProcess">Proceso migratorio</label>
          <input
            className="form-control"
            placeholder="Proceso migratorio"
            id="migratoryProcess"
            name="migratoryProcess"
            value={subscription?.migratoryProcess}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="annualIncome">Ingresos anuales</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              placeholder="Ingresos anuales"
              id="annualIncome"
              name="annualIncome"
              value={subscription?.annualIncome}
              type="number"
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group col-sm-12 col-md-8">
          <label htmlFor="mainContributor">Principal contribuidor</label>
          <input
            className="form-control"
            placeholder="Principal contribuidor"
            id="mainContributor"
            name="mainContributor"
            value={subscription?.mainContributor}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="jobType">Tipo de trabajo</label>
          <input
            className="form-control"
            placeholder="Tipo de trabajo"
            id="jobType"
            name="jobType"
            value={subscription?.jobType}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="jointTaxes">
            ¿Impuestos en conjunto oseparado?
          </label>
          <input
            className="form-control"
            placeholder="Llenan los taxes en conjunto o por separado"
            id="jointTaxes"
            name="jointTaxes"
            value={subscription?.jointTaxes}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="whoClaimsTemplates">¿Quién reclama la plantilla?</label>
          <input
            className="form-control"
            placeholder="Quién reclama la plantilla"
            id="whoClaimsTemplates"
            name="whoClaimsTemplates"
            value={subscription?.whoClaimsTemplates}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="insurance">Aseguranza seleccionada</label>
          <input
            className="form-control"
            placeholder="Aseguranza seleccionada"
            id="insurance"
            name="insurance"
            value={subscription?.insurance}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="monthlyPremium">Prima mensual</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              placeholder="Prima mensual"
              id="monthlyPremium"
              name="monthlyPremium"
              value={subscription?.monthlyPremium}
              type="number"
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="maximumSpend" className=""><span>Gastos máximos</span></label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input

              className="form-control"
              placeholder="Gastos máximos"
              id="maximumSpend"
              name="maximumSpend"
              value={subscription?.maximumSpend}
              type="number"
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="annualDeductible" className=""><span>Deducible anual</span> </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              placeholder="Deducible anual"
              id="annualDeductible"
              name="annualDeductible"
              value={subscription?.annualDeductible}
              type="number"
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="genericDrug" className=""><span>Medicamentos genericos</span> </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              placeholder="Medicamentos genericos"
              id="genericDrug"
              name="genericDrug"
              value={subscription?.genericDrug}
              type="number"
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="primaryDoctor">Medico principal</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              placeholder="Medico principal"
              id="primaryDoctor"
              name="primaryDoctor"
              value={subscription?.primaryDoctor}
              type="number"
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="medicalSpecialist" className=""><span>Medico especialista</span></label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input className="form-control" aria-label="Amount (to the nearest dollar)" placeholder="Medico especialista"
              id="medicalSpecialist"
              name="medicalSpecialist"
              value={subscription?.medicalSpecialist}
              type="number"
              onChange={handleNameChange} />

          </div>
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="emergencyRoom" className=""><span>Sala de emergencias</span></label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">%</span>
            </div>
            <input
              className="form-control"
              placeholder="Sala de emergencias"
              id="emergencyRoom"
              name="emergencyRoom"
              value={subscription?.emergencyRoom}
              type="number"
              onChange={handleNameChange} />
          </div>

        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="subsidy">Subsidio</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              placeholder="Subsidio"
              id="subsidy"
              name="subsidy"
              value={subscription?.subsidy}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="clientAnnotations">Anotaciones del cliente</label>
          <input
            className="form-control"
            placeholder="Anotaciones del cliente"
            id="clientAnnotations"
            name="clientAnnotations"
            value={subscription?.clientAnnotations}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-8">
          <label htmlFor="callcenterAnnotations">Anotaciones del CallCenter</label>
          <input
            className="form-control"
            placeholder="Anotaciones del CallCenter"
            id="callcenterAnnotations"
            name="callcenterAnnotations"
            value={subscription?.callcenterAnnotations}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-4">
          <label htmlFor="audio">audio</label>
          <input
            className="form-control"
            placeholder="audio"
            id="audio"
            name="audio"
            value={subscription?.audio}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group col-sm-12 col-md-5">
          <label htmlFor="processorId">Procesadora</label>
          <select required defaultValue="1" className="custom-select w-100" id="processorId" name="processorId" onChange={handleNameChange}>
            {processors.map((processor) => (
              <option value={processor.id} key={processor.id} >{processor.processorName}</option>
            ))}
          </select>
        </div>
        <div className="form-group col-sm-12 col-md-3">
          <label htmlFor="processorId">Estado</label>
          <select className="custom-select" name="state" id="state" onChange={handleNameChange}>
            <option value="GENERATED" defaultChecked >Generado </option>
            <option value="ACCEPTED">Aceptado </option>
            <option value="REJECTED" >Rechazado </option>
            <option value="CANCELED">Cancelado </option>
          </select>
        </div>
        <div className="form-group col-sm-12 col-md-2">
          <label htmlFor="startCoverage">Inicio de cobertura
          <span className="text-danger"> (*)</span>
          </label>
          <input
            className="form-control"
            placeholder="Inicio de cobertura"
            id="startCoverage"
            name="startCoverage"
            value={subscription?.startCoverage}
            type="date"
            onChange={handleNameChange}
            required
          />
          {((!subscription?.startCoverage || subscription?.startCoverage === "0000-00-00") && showErrors ) && 
            <span className="text-danger small px-2"> Por favor, completar este campo</span>
          }
        </div>
        <div className="form-group col-sm-12 col-md-2">
          <label htmlFor="endCoverage">Fin de cobertura</label>
          <input
            className="form-control"
            placeholder="Fin de cobertura"
            id="endCoverage"
            name="endCoverage"
            value={subscription?.endCoverage}
            type="date"
            onChange={handleNameChange}
          />
        </div>

      </div>
      <div className="form-group text-right w-100 mt-2">

        {loading && <div className="d-flex justify-content-center col-md-12 text-success">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <h5 className="h5 font-weight-bold p-2">Guardando</h5>
        </div>}

        <div className="row">
          <div className="col-6">
            <Link
              to={"/subscriptions"}
              className="btn btn-outline-secondary btn-block"
            >
              Cancelar
            </Link>
          </div>
          <div className="col-6">
            {!loading && <button className="btn btn-success btn-block" type="button" title="Crear Producto" onClick={saveSubscription}>Guardar</button>}
            {loading && <button className="btn btn-success btn-block" type="button" title="Crear Producto" disabled>Guardando  <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div></button>}
          </div>
        </div>

      </div>
    </form>
  );
};

export default SubscriptionForm;