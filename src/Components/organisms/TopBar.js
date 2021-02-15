/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import Label_radio from "../molecules/Label_radio";
import {
  ADMIN_ISLEM_LISTESI,
  ROLLER,
  HEMSIRE_ISLEM_LISTESI,
} from "../../constants";
import AppContext from "../../AppContext";
import { Button, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import { insertNewUser, logout } from "../../firestoreMethods";

const TopBar = () => {
  const centralState = React.useContext(AppContext);
  const rol = centralState.loggedOnUser.rol;

  const [params, setParams] = useState({
    showNewUserModal: false,
    newUserSelectedRoleId: 2,
    newUserFirstName: "",
    newUserLastName: "",
    newUserTc: "",
  });

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
  };

  const Txt = (stateField) => (
    <TextField
      variant="outlined"
      value={params[stateField]}
      onChange={(t) => {
        setParam(stateField, t.target.value);
      }}
    />
  );

  const generateNewUserModal = () => {
    if (!params.showNewUserModal) return;

    const rows = [
      { label: "ADI", component: Txt("newUserFirstName") },
      { label: "SOYADI", component: Txt("newUserLastName") },
      { label: "TC", component: Txt("newUserTc") },
      {
        label: "ROL",
        component: (
          <Select
            value={params.newUserSelectedRoleId}
            onChange={(e) => {
              setParam("newUserSelectedRoleId", e.target.value);
            }}
          >
            {Object.keys(ROLLER).map((key) => (
              <MenuItem value={ROLLER[key].id}>{ROLLER[key].name}</MenuItem>
            ))}
          </Select>
        ),
      },
    ];

    return (
      <Modal
        open={params.showNewUserModal}
        onClose={() => {
          setParam("showNewUserModal", false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            backgroundColor: "white",
            width: "50%",
            height: "50%",
            padding: 30,
            marginLeft: "25%",
            marginTop: "10%",
          }}
        >
          {rows.map((r) => {
            return (
              <div
                style={{
                  display: "flex",
                  marginBottom: 20,
                  alignItems: "center",
                }}
              >
                <div style={{ width: 80 }}>{r.label}</div>
                {r.component}
              </div>
            );
          })}

          <Button
            variant="contained"
            color="secondary"
            onClick={(_) => {
              insertNewUser({
                adi: params.newUserFirstName,
                soyadi: params.newUserLastName,
                tc: params.newUserTc,
                rol: params.newUserSelectedRoleId,
              });
              setParams({
                ...params,
                showNewUserModal: false,
                newUserSelectedRoleId: 2,
                newUserFirstName: "",
                newUserLastName: "",
                newUserTc: "",
              });
            }}
          >
            KAYDET
          </Button>
        </div>
      </Modal>
    );
  };

  const getProperMenuItems = () => {
  
    if (rol === 1) return ADMIN_ISLEM_LISTESI;
    else if (rol === 3) return HEMSIRE_ISLEM_LISTESI;
    else return [];
  };

  const islemListesi = (
    <Label_radio
      liste={getProperMenuItems()}
      selectedValue={centralState.selectedList} //{params.selectedRadio}
      onSelectionChange={(newSelection) => {
        centralState.changeCentralState("selectedList", newSelection);
      }}
    />
  );

  const newUserButton = [].includes(rol) && (
    <Button
      variant="contained"
      color="secondary"
      onClick={(_) => {
        setParam("showNewUserModal", true);
      }}
    >
      Yeni Kişi Ekle
    </Button>
  );

  const logoutButton = (
    <Button
    style={{textTransform:"none"}}
      variant="contained"
      color="primary"
      size="small"
      onClick={(_) => {
        const afterMethod = () => {
          centralState.changeCentralState("loggedOnUser", { rol: -1 });
        };

        logout(afterMethod);
      }}
    >
      {"ÇIKIŞ : " + centralState.loggedOnUser.email}
    </Button>
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {islemListesi}
      {newUserButton}
      {logoutButton}
      {generateNewUserModal()}
    </div>
  );
};

export default TopBar;
