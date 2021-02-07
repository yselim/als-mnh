import React, { useState, useEffect } from "react";
import AppContext from "../../AppContext";
import PersonalDataCard from "./PersonalDataCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  pullReportsOfPatient,
  pullReportsOfWriter,
  detachNurseAndPatient,
  connectNurseAndPatient,
  pullUsers
} from "../../firestoreMethods";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserSearcherModal from "./UserSearcherModal";
import { Link } from "react-router-dom";

export default () => {
  const centralState = React.useContext(AppContext);

  const { selectedUser } = centralState;

  const [params, setParams] = useState({
    nursesOfPatient: [],
    reportsOfPatient: [],
    patientsOfNurse: [],
    reportsOfThisWriter: [],
    showUserSelector: false,
  });

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
  };

  const uid = selectedUser && selectedUser.uid;
  useEffect(() => {
    pullProperDataForSelectedUser();
  }, [uid]);

  const pullProperDataForSelectedUser = async () => {
    //TODO: aşağıdaki state'leri düzelt, her durumda diğer state'ler boşaltılsın.

    if (selectedUser.rol === 2) {
      // hasta
      const nurses = await pullUsers({ rol:3, patientUid:selectedUser.uid});
      const reports = await pullReportsOfPatient(selectedUser.uid);
      setParams({
        ...params,
        nursesOfPatient: nurses,
        reportsOfPatient: reports,
        showUserSelector: false,
      });
    } else if (selectedUser.rol === 3) {
      // hemşire:
      const patients = await pullUsers({rol:2, nurseUid: selectedUser.uid});

      const reports = await pullReportsOfWriter(selectedUser.uid);
      setParams({
        ...params,
        patientsOfNurse: patients,
        reportsOfThisWriter: reports,
        showUserSelector: false,
      });
    } else if (selectedUser.rol === 1 || selectedUser.rol === 4) {
      // hoca ve admin:
      const reports = await pullReportsOfWriter(selectedUser.uid);
      setParams({
        ...params,
        patientsOfNurse: [],
        nursesOfPatient: [],
        reportsOfPatient: [],
        reportsOfThisWriter: reports,
        showUserSelector: false,
      });
    }
    // }
  };

  const nursesOfPatient = () => {
    if (selectedUser.rol !== 2) return null;

    const addNewNurseButton = (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={() => {
          setParam("showUserSelector", true);
        }}
      >
        Yeni Hemşire Ata
      </Button>
    );

    const nurses = params.nursesOfPatient;

    return (
      <div
        style={{
          marginBottom: 20,
          borderRadius: 15,
          padding: 10,
          backgroundColor: "#e6f0a0",
          border: "solid 2px rgb(163, 172, 96)",
        }}
      >
        <div>HASTAYA ATANAN HEMŞİRELER</div>
        {nurses.length === 0 ? (
          <div>Bu hastaya henüz hemşire atanmamaış.</div>
        ) : (
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
                <TableRow key={"nuse_list_key"+i+row.tc}>
                  <TableCell align="center">{row.tc} </TableCell>
                  <TableCell align="center">{row.adi} </TableCell>
                  <TableCell align="center">{row.soyadi} </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    <Button
                      variant="contained"
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Hasta-Hemşire atamasını iptal etmek istiyor musunuz?"
                          )
                        ) {
                          await detachNurseAndPatient(
                            row.uid,
                            selectedUser.uid
                          );
                          pullProperDataForSelectedUser();
                        }
                      }}
                    >
                      ATAMAYI İPTAL ET
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {addNewNurseButton}
      </div>
    );
  };

  const reportsOfPatient = () => {
    if (selectedUser.rol !== 2) return null;

    const reports = params.reportsOfPatient;

    return (
      <div
        style={{
          marginBottom: 20,
          borderRadius: 15,
          padding: 10,
          backgroundColor: "rgb(226, 230, 253)",
          border: "solid 2px rgb(146, 153, 191))",
        }}
      >
        <div>HASTAYA YAZILMIŞ RAPORLAR</div>

        {reports.length === 0 ? (
          <div>Bu hastaya henüz rapor yazılmamış.</div>
        ) : (
          <Table aria-label="simple table">
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
                <TableRow key={"hastanin_raporlari" + row.uid + i}>
                  <TableCell align="center">{row.tarih} </TableCell>
                  <TableCell align="center">{row.yazar_adi_soyadi} </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    <Link to={"/report/" + row.uid} target="_blank">
                      Raporu Göster
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  };

  const patientsOfNurse = () => {
    if (selectedUser.rol !== 3) return null;

    const addNewPatientButton = (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={() => {
          setParam("showUserSelector", true);
        }}
      >
        Yeni Hasta Ata
      </Button>
    );

    const patients = params.patientsOfNurse;

    return (
     <div
        style={{
          marginBottom: 20,
          borderRadius: 15,
          padding: 10,
          backgroundColor: "#e6f0a0",
          border: "solid 2px rgb(163, 172, 96)",
        }}
      >
     <div>HEMŞİREYE ATANAN HASTALAR</div> 
     {
       patients.length === 0?
       <div>Bu hemşireye henüz hasta atanmamış.</div>
       :
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
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Hasta-Hemşire atamasını iptal etmek istiyor musunuz?"
                        )
                      ) {
                        await detachNurseAndPatient(selectedUser.uid, row.uid);
                        pullProperDataForSelectedUser();
                      }
                    }}
                  >
                    ATAMAYI İPTAL ET
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
     }
       
        {addNewPatientButton}
      </div>
    );
  };

  const reportsOfThisWriter = () => {
    if (selectedUser.rol === 2)
      // hastanın yazdığı rapor olmaz.
      return null;

    const reports = params.reportsOfThisWriter;

    return (
      <div
        style={{
          marginBottom: 20,
          borderRadius: 15,
          padding: 10,
          backgroundColor: "rgb(226, 230, 253)",
          border: "solid 2px rgb(146, 153, 191))",
        }}
      >
        <div style={{marginBottom:10}}> BU KİŞİNİN YAZDIĞI RAPORLAR</div>
        {reports.length === 0 ? (
          <div>Bu kişi hiç rapor yazmamış.</div>
        ) : (
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
                    <Link to={"/report/" + row.uid} target="_blank">
                      Raporu Göster
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  };

  const showUserChooser = () => {
    let roleForSearch; //
    if (selectedUser.rol === 2) roleForSearch = 3;
    else if (selectedUser.rol === 3) roleForSearch = 2;

    return (
      <UserSearcherModal
        rol={roleForSearch}
        open={params.showUserSelector}
        onClose={() => {
          setParam("showUserSelector", false);
          pullProperDataForSelectedUser();
        }}
        onItemSelect={(pairId) => {
          // setParam("showUserSelector", false);
          let nurseId = "";
          let patientId = "";

          if (selectedUser.rol === 2) {
            // ana listedeki kişi hasta ise:
            patientId = selectedUser.uid;
            nurseId = pairId;

            connectNurseAndPatient(nurseId, patientId).then(async(_) => {
                const hemsireler = await pullUsers({rol:3, patientUid:patientId });
                setParams({
                  ...params,
                  nursesOfPatient: hemsireler,
                  showUserSelector: false
                });
            
            });

          } else if (selectedUser.rol === 3) {
            nurseId = selectedUser.uid;
            patientId = pairId;

            connectNurseAndPatient(nurseId, patientId).then(async(_) => {
              const hastalar = await pullUsers({rol:2, nurseUid:nurseId });
              setParam("patientsOfNurse", hastalar);
              setParams({
                ...params,
                patientsOfNurse: hastalar,
                showUserSelector: false
              });
          
          });
          }
         
        }}
      />
    );
  };

  if (selectedUser.rol > -1) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // padding: 10,
          // margin: 10,
          // border: "solid black 2px",
          // borderRadius: 15,
        }}
      >
        <PersonalDataCard />
        {selectedUser.rol === 2 && nursesOfPatient()}
        {selectedUser.rol === 2 && reportsOfPatient()}
        {selectedUser.rol === 3 && patientsOfNurse()}
        {selectedUser.rol !== 2 && reportsOfThisWriter()}
        {params.showUserSelector && showUserChooser()}
      </div>
    );
  } else return null;
};
