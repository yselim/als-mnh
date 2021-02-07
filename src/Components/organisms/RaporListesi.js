import React, { useEffect } from "react";
import { pullAllReports } from "../../firestoreMethods";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AppContext from "../../AppContext";
import { Link } from "react-router-dom";

const RaporListesi = () => {
  const centralState = React.useContext(AppContext);
  const { reports, changeCentralState } = centralState;

  useEffect(() => {
    pullAllReports().then((res) => {
      changeCentralState("reports", res);
    });
  }, []);

  return (
    <div style={{}}>
     <div>TÜM RAPORLAR</div> 
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
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Hasta
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
    </div>
  );
};

export default RaporListesi;
