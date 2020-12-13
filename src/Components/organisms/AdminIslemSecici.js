/* eslint-disable react/jsx-pascal-case */
import React , {useState }from "react";
import Label_radio from "../molecules/Label_radio";
import {ADMIN_ISLEM_LISTESI} from "../../constants";
import AppContext from "../../AppContext";
import { Button } from "@material-ui/core";
import Row from "../atoms/Row";

export default () => {
  const centralState = React.useContext(AppContext); 

  const [params, setParams] = useState({
    showNewUserModal:false,
  });

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
  };

  const addNewUserClicked=()=>{
    alert("Yeni kişi ekleme modalı");
  }

  return (
    <Row style={{width:"100%", border:"solid black"}}>
      <Label_radio
        text={"Gösterilecek Liste"}
        liste={ADMIN_ISLEM_LISTESI}
        selectedValue = {centralState.selectedList}//{params.selectedRadio}
        onSelectionChange = {
          (newSelection)=>{ 
            centralState.changeCentralState("selectedList", newSelection);
          }}
      />

      <Button variant="contained" color="secondary" onClick={addNewUserClicked}>
        Yeni Kişi Ekle
      </Button>
    </Row>
  );
};
