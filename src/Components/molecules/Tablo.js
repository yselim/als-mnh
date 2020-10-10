import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default ({tableProps}) => {
const {titles, titleAligns, texts, textAligns} = tableProps;
  return (
    <div>

      <Table //className={classes.table}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {titles.map((k, i) => (
              <TableCell align={titleAligns[i]} style={{fontWeight:"bold"}}>{k}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {texts.map((row) => (
            <TableRow>

              {row.map((cell, i)=> <TableCell align={textAligns[i]}>{cell} </TableCell>)}
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
