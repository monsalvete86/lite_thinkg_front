import React, { useState, ChangeEvent, useEffect } from "react";
import * as companyDataService  from "../services/company.service";
import { getCurrentUser } from "../services/auth.service";
import * as userDataService  from "../services/user.service";
import IUser from "../types/user.type";

const Company: React.FC = () => {
  const currentUser = getCurrentUser();
  const initialCompanyState = {
    id: null,
    nameCompany: "",
    direction: "",
    nit: "",
    telephone: ""
  };

  const [company, setCompany] = useState(initialCompanyState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [banEdit, setBanEdit] = useState<number> (0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompany({ ...company, [name]: value });
  };

  const saveCompany = () => {
    var data = {
      nameCompany: company.nameCompany,
      direction: company.direction,
      nit: company.nit,
      telephone: company.telephone
    };
    
    if(banEdit === 0) {
      companyDataService.create(data)
        .then((response: any) => {
          setCompany({
            id: response.data.id,
            nameCompany: response.data.nameCompany,
            direction: response.data.direction,
            nit: response.data.nit,
            telephone: response.data.telephone
          });
          setSubmitted(true);
        
          userDataService.updateCompany(currentUser.id, response.data.id);
          setBanEdit(response.data.id)
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    } else {
      
      companyDataService.update(banEdit, data)
        .then((response: any) => {
          console.log("data ")
          console.log(response.data);
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    
  };
  
  useEffect(() => {
    userDataService.getUserById(currentUser.id)
     .then((result: any) => {
      if(result.companyId) {
        companyDataService.get(result.companyId)
          .then((result: any) => {
            console.log(result);
            
            setBanEdit(result.data.id)
            setCompany(result.data);
          })
      }
     })
     .catch((e) => {
        console.log(e.message)
     })
  }, []);

  return (
    <div className="submit-form container">
      {submitted && (
        <div>
          <h4>You company has been saved successfully!</h4>
        </div>
      ) }
      { (
        <div className="row">
          <div className="form-group col-12">
            <label htmlFor="nameCompany">Nombre Compañia</label>
            <input
              type="text"
              className="form-control"
              id="nameCompany"
              required
              value={company.nameCompany}
              onChange={handleInputChange}
              name="nameCompany"
            />
          </div>

          <div className="form-group col-12">
            <label htmlFor="direction">Dirección</label>
            <input
              type="text"
              className="form-control"
              id="direction"
              required
              value={company.direction}
              onChange={handleInputChange}
              name="direction"
            />
          </div>
          <div className="form-group col-sm-12 col-md-6">
            <label htmlFor="nit">ID Legal</label>
            <input
              type="text"
              className="form-control"
              id="nit"
              required
              value={company.nit}
              onChange={handleInputChange}
              name="nit"
            />
          </div>
          <div className="form-group col-sm-12 col-md-6">
            <label htmlFor="telephone">Telefono</label>
            <input
              type="text"
              className="form-control"
              id="telephone"
              required
              value={company.telephone}
              onChange={handleInputChange}
              name="telephone"
            />
          </div>
          <div className="form-group col-12 modal-footer">
            <button onClick={saveCompany} className="btn btn-success">
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;
