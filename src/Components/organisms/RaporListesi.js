import React , {useEffect} from "react";
import { pullAllReports } from "../../firestoreMethods";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import AppContext from "../../AppContext";


const RaporListesi= () => {

  const centralState = React.useContext(AppContext);
  const { reports, changeCentralState } = centralState;

  useEffect(() => {
    pullAllReports().then((res)=>{
      changeCentralState("reports", res);
    });

  }, [])


  return <div style={{ border: "solid black", marginBottom: 20 }}>
  TÜM RAPORLAR
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
};

export default RaporListesi;