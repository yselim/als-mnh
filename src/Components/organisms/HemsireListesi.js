import React from "react";
import AppContext from "../../AppContext";
import KisiListesi from "../molecules/KisiListesi";


const HemsireListesi= () => {
  const centralState = React.useContext(AppContext);


  return (
    <div>
    <KisiListesi
      // rows={centralState.nurses.map((u) => {
      //   return { adi: u.adi, soyadi: u.soyadi, tc: u.tc };
      // })}

      rows={centralState.nurses}
    />
  </div>
  );
};

export default HemsireListesi;