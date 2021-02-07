import React from "react";
import AppContext from "../../AppContext";

export default () => {
  const centralState = React.useContext(AppContext);

  if (centralState.selectedUser && centralState.selectedUser.rol) {
    return <div style={{textAlign:"left"}}>
       <p>ADI : {centralState.selectedUser.adi}</p>
       <p>SOYADI : {centralState.selectedUser.soyadi}</p>
       <p>TC: {centralState.selectedUser.tc}</p>
       {/* <p>Rol: {centralState.selectedUser.rol}</p> */}
    </div>;
  } else return null;
};