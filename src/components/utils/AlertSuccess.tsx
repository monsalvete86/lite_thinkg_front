import React from "react";

const AlertSuccess: React.FC = () => {

    return (
        <div className="alert alert-success position-fixed fixed-top" style={{zIndex:1}} role="alert">
           Los datos se guardaron existosamente
        </div>
    )
}
export default AlertSuccess;