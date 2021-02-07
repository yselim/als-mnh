import { Button, Modal, TextField, Table, TableHead, TableCell, TableBody, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import {
  findUser,
  connectNurseAndPatient
  } from "../../firestoreMethods";
export default ({ open, onClose, rol, onItemSelect }) => {
  const [params, setParams] = useState({
    searchText: "",
    results:[]
  });

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
  };


  const renderResultList = ()=>{
    return <Table //className={classes.table}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              TC
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              ADI
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              SOYADI
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
                        </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {params.results.map((row, i) => (
            <TableRow key={row.uid +"arama_listesi_kisileri"}>
              <TableCell align="center">{row.tc} </TableCell>
              <TableCell align="center">{row.adi} </TableCell>
              <TableCell align="center">{row.soyadi} </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
              <Button variant="contained" onClick={async()=>{
                  // centralState.changeCentralState("selectedUser", row);
                  await onItemSelect(row.uid);
                  await onClose();
                  
              }}>
                  SEÇ
              </Button>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
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
        <TextField
          variant="outlined"
          value={params.searchText}
          onChange={(t) => {
            setParam("searchText", t.target.value);
          }}
        />
        <Button variant="contained" color="secondary" onClick={async(_) => {

           const results = await findUser(params.searchText, rol);
           setParam("results", results);

        }}>
          ARA
        </Button>

        {renderResultList()}
      </div>
     
    </Modal>
  );
};
