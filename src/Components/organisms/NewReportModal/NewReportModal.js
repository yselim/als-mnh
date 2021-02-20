import {
  Button,
  Modal,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import { findUser, connectNurseAndPatient } from "../../../firestoreMethods";
import { useForm } from "react-hook-form";

import "./style.css";

export default ({ open, onClose }) => {
  const [params, setParams] = useState({});

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
  };

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => alert("Data kaydedilecek...");

  // console.log(watch("example")); // watch input value by passing the name of it

  const generateRadioGroup = (list, name) => {
    return (
      <div>
        {list.map((text) => (
          <div className="radioAndLabelDiv">
            <input
              type="radio"
              name={name}
              value={text}
              ref={register}
              style={{ marginRight: 10 }}
            />
            <div>{text}</div>
          </div>
        ))}
        <div className="radioAndLabelDiv">
          <input
            type="radio"
            name={name}
            value={params[name]}
            ref={register}
            style={{ marginRight: 10 }}
          />
          <TextField
            placeholder="Diğer"
            variant="standard"
            value={params[name]}
            onChange={(t) => setParam(name, t.target.value)}
            size="small"
          />
        </div>
      </div>
    );
  };

  const kg = (
    <TableRow>
      <TableCell align="left">{"Kilo (kg)"} </TableCell>
      <TableCell align="left">
        <input name="kg" ref={register({ required: true })} />
      </TableCell>
      <TableCell align="left">
        {errors.kg && <span>Lütfen bir değer giriniz</span>}
      </TableCell>
    </TableRow>
  );

  const beslenme = (
    <TableRow>
      <TableCell align="left">{"Beslenme"} </TableCell>
      <TableCell align="left">
        {generateRadioGroup(["Ağızdan", "Nazogastrik tüp", "PEG"], "beslenme")}
      </TableCell>
      <TableCell align="left">
        {errors.beslenme && <span>Lütfen bir değer seçiniz</span>}
      </TableCell>
    </TableRow>
  );

  const solunum = (
    <TableRow>
      <TableCell align="left">{"Solunum"} </TableCell>
      <TableCell align="left">
        {generateRadioGroup(
          ["Cihaz kullanmıyor", "Maske ile Bipap", "Trakeostomi"],
          "solunum"
        )}
      </TableCell>
      <TableCell align="left">
        {errors.solunum && <span>Lütfen bir değer seçiniz</span>}
      </TableCell>
    </TableRow>
  );

  const konusma = (
    <TableRow>
      <TableCell align="left">{"Konuşma"} </TableCell>
      <TableCell align="left">
        {generateRadioGroup(
          [
            "Normal",
            "Tekararlama ile anlaşılabilir",
            "Anlaşılamıyor",
            "Konuşma yok",
          ],
          "konusma"
        )}
      </TableCell>
      <TableCell align="left">
        {errors.konusma && <span>Lütfen bir değer seçiniz</span>}
      </TableCell>
    </TableRow>
  );

  const iletisimYontemi = null;

  return (
    <div className="modalBox">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input name="kilo" defaultValue="test" ref={register} /> */}

        <Table //className={classes.table}
          aria-label="simple table"
        >
          <TableBody>
            {kg}
            {beslenme}
            {solunum}
            {konusma}
            {iletisimYontemi}
          </TableBody>
        </Table>

        {/* <input type="submit"  value="KAYDET" /> */}
        <Button type="submit" color="secondary" variant="contained" >KAYDET</Button>
      </form>
    </div>
  );
};
