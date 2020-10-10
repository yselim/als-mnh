import React , {useState }from "react";
import Label_combobox from "../molecules/Label_combobox";
import Label_radio from "../molecules/Label_radio";
import {ADMIN_ISLEM_LISTESI} from "../../constants";
import AppContext from "../../AppContext";

export default () => {
  const centralState = React.useContext(AppContext); 

  // const [params, setParams] = useState({
  //   selectedRadio: "Yöneticiler"
  // });

  // const setParam = (key, value) => {
  //   setParams({
  //     ...params,
  //     [key]: value,
  //   });
  // };

  return (
    <div>
      <Label_radio
        text={"Gösterilecek Liste"}
        liste={ADMIN_ISLEM_LISTESI}
        selectedValue = {centralState.selectedList}//{params.selectedRadio}
        onSelectionChange = {
          (newSelection)=>{ 
            centralState.changeCentralState("selectedList", newSelection);
          }}
      />
    </div>
  );
};
