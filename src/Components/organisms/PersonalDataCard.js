import React from "react";
import AppContext from "../../AppContext";

export default () => {
  const centralState = React.useContext(AppContext);

  if (centralState.selectedUser && centralState.selectedUser.rol) {
    return <div>
        {centralState.selectedUser.adi}
    </div>;
  } else return null;
};