import React from "react";

const AlertError: React.FC = () => {

    return (
        <div className="alert alert-danger  position-fixed fixed-top" style={{zIndex:1}} role="alert">
            Hubo un error al guardar los datos
        </div>
    )
}
export default AlertError;