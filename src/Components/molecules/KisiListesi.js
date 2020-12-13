import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import AppContext from "../../AppContext";

export default ({ rows }) => {
  const centralState = React.useContext(AppContext);
  
  return (
    <div>
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
            <TableCell align="center" style={{ fontWeight: "bold" }}>
                        </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow>
              <TableCell align="center">{row.tc} </TableCell>
              <TableCell align="center">{row.adi} </TableCell>
              <TableCell align="center">{row.soyadi} </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
              <Button variant="contained" onClick={()=>{
                  centralState.changeCentralState("selectedUser", row);
              }}>
                  SEÇ
              </Button>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
