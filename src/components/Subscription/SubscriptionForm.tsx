import React, { useState, ChangeEvent, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as ProcessorService from "../../services/processor.service";
import IProcessor from '../../types/processor.type';
import ISubscription from "../../types/subscription.type";
import *  as SubscriptionService from "../../services/subscription.service"

const SubscriptionForm: React.FC = () => {
    const { id } = useParams();

    const initialState = {
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
        startCoverage: "",
        endCoverage: "",
        processorId: 0,
        // clientListId: 2
    }

    useEffect(() => {
        if (id) {
            SubscriptionService.get(id)
                .then((result: any) => {
                    setSubscription(result.data)
                })
        }
    }, []);

    const saveSubscription = () => {
        SubscriptionService.update(subscription.id, subscription)
            .then((response: any) => {
                console.log("data ")
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const [subscription, setSubscription] = useState<ISubscription>(initialState);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setSubscription({ ...subscription, [name]: value });
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
        <div className="form form-row">
            <h5 className="w-100 text-center text-primary"> Completar suscripción</h5>
            <div className="col-12 col-md-6  border-right ">
                <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor="annualIncome">Ingresos anuales</label>
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor="jointTaxes">¿Llenan los taxes en conjunto o por separado?<small className="help">(Solo, en conjunto)</small></label>
                    <input
                        className="form-control"
                        placeholder="Llenan los taxes en conjunto o por separado"
                        id="jointTaxes"
                        name="jointTaxes"
                        value={subscription?.jointTaxes}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor="monthlyPremium">Prima mensual</label>
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
                <div className="form-group">
                    <label htmlFor="maximumSpend">Gastos máximos</label>
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
                <div className="form-group">
                    <label htmlFor="annualDeductible">Deducible anual</label>
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

                <div className="form-group">
                    <label htmlFor="genericDrug">Medicamentos genericos</label>
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
            <div className="col-12 col-md-6 ">
                <div className="form-group">
                    <label htmlFor="primaryDoctor">Medico principal</label>
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

                <div className="form-group">
                    <label htmlFor="medicalSpecialist">Medico especialista</label>
                    <input
                        className="form-control"
                        placeholder="Medico especialista"
                        id="medicalSpecialist"
                        name="medicalSpecialist"
                        value={subscription?.medicalSpecialist}
                        type="number"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emergencyRoom">Sala de emergencias</label>
                    <input
                        className="form-control"
                        placeholder="Sala de emergencias"
                        id="emergencyRoom"
                        name="emergencyRoom"
                        value={subscription?.emergencyRoom}
                        type="number"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subsidy">Subsidio</label>
                    <input
                        className="form-control"
                        placeholder="Subsidio"
                        id="subsidy"
                        name="subsidy"
                        value={subscription?.subsidy}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
                <label htmlFor="processorId">Estado</label>

                    <select className="custom-select" name="state" id="state" onChange={handleNameChange}>
                        <option value="GENERATED" defaultChecked >Generado </option>
                        <option value="ACCEPTED">Aceptado </option>
                        <option value="REJECTED" >Rechazado </option>
                        <option value="CANCELED">Cancelado </option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="processorId">Procesadora</label>
                    <select required defaultValue="" className="custom-select w-100" id="processorId" name="processorId"  onChange={handleNameChange}>
                        <option value="">--Seleccionar--</option>
                        {processors.map((processor) => (
                            <option value={processor.id} key={processor.id} >{processor.processorName}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="startCoverage">Inicio de cobertura</label>
                    <input
                        className="form-control"
                        placeholder="Inicio de cobertura"
                        id="startCoverage"
                        name="startCoverage"
                        value={subscription?.startCoverage}
                        type="date"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
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
                    <button className="btn btn-success col-3" title="Crear Producto" onClick={saveSubscription}>Guardar</button>

                </div>
        </div>
    );
};

export default SubscriptionForm;