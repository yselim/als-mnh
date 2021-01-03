import React from "react";
import AppContext from "../../AppContext";
import KisiListesi from "../molecules/KisiListesi";

export default () => {
  const centralState = React.useContext(AppContext);

  return (
    <div>
      <KisiListesi
        rows={centralState.docs}
      />
    </div>
  );
};
