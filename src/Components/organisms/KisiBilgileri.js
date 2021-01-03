import React, { useState, useEffect } from "react";
import AppContext from "../../AppContext";
import Column from "../atoms/Column";
import PersonalDataCard from "./PersonalDataCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  pullNursesOfPatient,
  pullReportsOfPatient,
  pullPatientsOfNurse,
  pullReportsOfWriter
} from "../../firestoreMethods";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default () => {
  const centralState = React.useContext(AppContext);

  const { selectedUser } = centralState;

  const [params, setParams] = useState({
    nursesOfPatient: [],
    reportsOfPatient: [],
    patientsOfNurse: [],
    reportsOfThisWriter: [],
    previousSelectedUserUid: "--",
  });

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
  };

  const pullProperDataForSelectedUser = async () => { //TODO: aşağıdaki state'leri düzelt, her durumda diğer state'ler boşaltılsın.
    if (
      selectedUser.uid &&
      params.previousSelectedUserUid !== selectedUser.uid
    ) {
      if (selectedUser.rol === 2) {// hasta
        const nurses = await pullNursesOfPatient(selectedUser.uid);
        const reports = await pullReportsOfPatient(selectedUser.uid);
        setParams({
          ...params,
          nursesOfPatient: nurses,
          reportsOfPatient: reports,
          previousSelectedUserUid: selectedUser.uid,
        });
      }
      else if (selectedUser.rol === 3) {// hemşire:
        const patients = await pullPatientsOfNurse(selectedUser.uid);
        const reports = await pullReportsOfWriter(selectedUser.uid);
        setParams({
          ...params,
          patientsOfNurse: patients,
          reportsOfThisWriter: reports,
          previousSelectedUserUid: selectedUser.uid,
        });
      }
      else if (selectedUser.rol === 1 || selectedUser.rol === 4) {// hoca ve admin:
        const reports = await pullReportsOfWriter(selectedUser.uid);
        setParams({
          ...params,
          patientsOfNurse: [],
          nursesOfPatient:[],
          reportsOfPatient:[],
          reportsOfThisWriter: reports,
          previousSelectedUserUid: selectedUser.uid,
        });
      }
    }
  };

  pullProperDataForSelectedUser();

  const nursesOfPatient = () => {
    if (selectedUser.rol !== 2) return null;

    const addNewNurseButton = (
      <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={()=>{
        alert("Hemşire listesi açılacak.");
      }}>
        Yeni Hemşire Ata
      </Button>
    );

    const nurses = params.nursesOfPatient;

    if (nurses.length === 0)
      return (
        <div style={{ backgroundColor: "yellow" }}>
          <div>Bu hastaya henüz hemşire atanmamaış.</div>
          {addNewNurseButton}
        </div>
      );

    return (
      <div style={{ border: "solid black", marginBottom: 20 }}>
        Hastanın Hemşireleri
        <Table //className={classes.table}
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
              <TableCell
                align="center"
                style={{ fontWeight: "bold" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nurses.map((row, i) => (
              <TableRow>
                <TableCell align="center">{row.tc} </TableCell>
                <TableCell align="center">{row.adi} </TableCell>
                <TableCell align="center">{row.soyadi} </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      alert("Bu hemşire silinecek...");
                    }}
                  >
                    ATAMAYI İPTAL ET
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      {addNewNurseButton}
      </div>
    );
  };

  const reportsOfPatient = () => {
    if (selectedUser.rol !== 2) return null;

    const reports = params.reportsOfPatient;

    if (reports.length === 0)
      return (
        <div style={{ backgroundColor: "yellow" }}>
          Bu hastaya henüz rapor yazılmamış.
        </div>
      );

    return (
      <div style={{ border: "solid black", marginBottom: 20 }}>
        Hastaya Yazılmış Raporlar
        <Table //className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Tarih
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Yazar
              </TableCell>

              <TableCell
                align="center"
                style={{ fontWeight: "bold" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((row, i) => (
              <TableRow>
                <TableCell align="center">{row.tarih} </TableCell>
                <TableCell align="center">{row.yazar_adi_soyadi} </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      alert("Rapor ayrıntıları gösterilecek.");
                    }}
                  >
                    RAPORU GÖSTER
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const patientsOfNurse = () => {
    if (selectedUser.rol !== 3) return null;

    const addNewPatientButton = (
      <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={()=>{
        alert("Hasta listesi açılacak.");
      }}>
        Yeni Hasta Ata
      </Button>
    );

    const patients = params.patientsOfNurse;

    if (patients.length === 0)
      return (
        <div style={{ backgroundColor: "yellow" }}>
          <div>Bu hemşireye henüz hasta atanmamış.</div>
          {addNewPatientButton}
        </div>
      );

    return (
      <div style={{ border: "solid black", marginBottom: 20 }}>
        Hemşireye Atanan Hastalar
        <Table //className={classes.table}
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
              <TableCell
                align="center"
                style={{ fontWeight: "bold" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((row, i) => (
              <TableRow>
                <TableCell align="center">{row.tc} </TableCell>
                <TableCell align="center">{row.adi} </TableCell>
                <TableCell align="center">{row.soyadi} </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      alert("Bu hasta bu hemşireden koparılacak...");
                    }}
                  >
                    ATAMAYI İPTAL ET
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      {addNewPatientButton}
      </div>
    );
  };

  const reportsOfThisWriter = () => {
    if (selectedUser.rol === 2)
      // hastanın yazdığı rapor olmaz.
      return null;

      const reports = params.reportsOfThisWriter;
  
      if (reports.length === 0)
        return (
          <div style={{ backgroundColor: "yellow" }}>
            Bu kişi hiç rapor yazmamış.
          </div>
        );
  
      return (
        <div style={{ border: "solid black", marginBottom: 20 }}>
          Seçili Kişinin Yazdığı Raporlar
          <Table //className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Tarih
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Hasta Adı
                </TableCell>
  
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((row, i) => (
                <TableRow>
                  <TableCell align="center">{row.tarih} </TableCell>
                  <TableCell align="center">{row.hasta_adi_soyadi} </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        alert("Rapor ayrıntıları gösterilecek.");
                      }}
                    >
                      RAPORU GÖSTER
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
  };

  if (selectedUser.rol > -1) {
    return (
      <Column>
        <PersonalDataCard />
        {selectedUser.rol === 2 && nursesOfPatient()}
        {selectedUser.rol === 2 && reportsOfPatient()}
        {selectedUser.rol === 3 && patientsOfNurse()}
        {selectedUser.rol !== 2 && reportsOfThisWriter()}
      </Column>
    );
  } else return null;
};
