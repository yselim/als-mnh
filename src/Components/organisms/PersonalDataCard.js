import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AppContext from "../../AppContext";

export default () => {
  const centralState = React.useContext(AppContext);
  let liste = [{ text: "BİLGİLER ÇEKİLİYOR..." }];

  const user = centralState.selectedUser;
  if (user && user.rol) {
    liste = [
      {
        text: "ADI-SOYADI",
        data: user.adi + " " + user.soyadi,
      },

      { text: "TC", data: user.tc },
      {
        text: "",
        data: (
          <Link target="_blank" to={"/userDetails/"+user.uid}>
            Detaylı Bilgiler
          </Link>
        ),
      },
    ];
  }

  if (centralState.selectedUser && centralState.selectedUser.rol) {
    return (
      <div style={{ textAlign: "left" }}>
        <Table size="small">
          <TableBody>
            {liste.map((l) => (
              <TableRow>
                <TableCell
                  align="left"
                  style={{ width: "20%", fontWeight: "bold" }}
                >
                  {l.text}
                </TableCell>
                <TableCell align="left" style={{ width: "75%" }}>
                  {l.data}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else return null;
};
