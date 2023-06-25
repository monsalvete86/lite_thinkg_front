import React, { useState, ChangeEvent, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import ISubscription from "../../types/subscription.type";
import *  as SubscriptionService from "../../services/subscription.service"

const SubscriptionForm: React.FC = () => {
    const { id } = useParams();

    const initialState = {
        id: null,
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
        processorId: 1,
        clientListId: 2
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
        console.log(subscription)
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

    const createSubscription = () => {
        // Aquí puedes realizar alguna acción con los datos del producto
        console.log('Nombre:', subscription?.migratoryProcess);
        SubscriptionService.create(subscription)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        // Resto de la lógica...
    };

    return (
        <div className="form form-row">
            <div className="col-12 col-md-6 border">
                <div className="form-group">
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
                    <input
                        className="form-control"
                        placeholder="jointTaxes"
                        id="jointTaxes"
                        name="jointTaxes"
                        value={subscription?.jointTaxes}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        placeholder="Ocupación"
                        id="whoClaimsTemplates"
                        name="whoClaimsTemplates"
                        value={subscription?.whoClaimsTemplates}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        placeholder="Quién reclama la plantilla"
                        id="insurance"
                        name="insurance"
                        value={subscription?.insurance}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        placeholder="monthlyPremium"
                        id="monthlyPremium"
                        name="monthlyPremium"
                        value={subscription?.monthlyPremium}
                        type="number"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
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
            <div className="col-12 col-md-6 border">
                <div className="form-group">
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
                    <select className="custom-select" name="state" id="state" onChange={handleNameChange}>
                        <option value="REJECTED" >Rechazado </option>
                        <option value="ACEPTED">Aceptado </option>
                        <option value="CANCELED">Cancelado </option>
                    </select>
                </div>
                <div className="form-group">
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
                <div className="form-group">
                    <button className="btn btn-success" title="Crear Producto" onClick={saveSubscription}>Crear Listado</button>

                </div>
            </div>
        </div>
    );
};

export default SubscriptionForm;