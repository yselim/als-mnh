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
import {
  findUser,
  connectNurseAndPatient,
  addReport,
} from "../../../firestoreMethods";
import { useForm } from "react-hook-form";

import "./style.css";
import { formFields, formInputTypes } from "../../../constants";

export default ({ open, onClose, hasta_adi_soyadi,
  hasta_uid,
  yazar_adi_soyadi,
  yazar_uid }) => {
  const [params, setParams] = useState({});

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
  };

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log("form data:", data);
 
    const reportData = {
      ...data,
      hasta_adi_soyadi,
      hasta_uid,
      yazar_adi_soyadi,
      yazar_uid
    };

    if (data["Diğer iletisimYontemi"])
      reportData["Diğer İletişim Yöntemi"] = params["iletisimYontemi"];

    addReport(reportData).then(onClose);
  };
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

  const generateCheckGroup = (list, name) => {
    return (
      <div>
        {list.map((text) => (
          <div className="radioAndLabelDiv">
            <input
              type="checkbox"
              name={text}
              ref={register}
              style={{ marginRight: 10 }}
            />
            <div>{text}</div>
          </div>
        ))}

        <div className="radioAndLabelDiv">
          <input
            type="checkbox"
            name={"Diğer " + name}
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

  const generateRadioTable = (rowNames, columnNames, name) => {
    return (
      <Table //className={classes.table}
        aria-label="simple table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {columnNames.map((c) => (
              <TableCell align="center">{c}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody style={{ border: "0px" }}>
          {rowNames.map((r) => (
            <TableRow>
              <TableCell>{r}</TableCell>
              {columnNames.map((c) => (
                <TableCell align="center">
                  <input type="radio" name={r} value={c} ref={register} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const generateFormInput = (name, input) => {
    let item = null;

    if (input.type === formInputTypes.numberInput)
      item = <input name={name} ref={register} />;
    else if (input.type === formInputTypes.radioList)
      item = generateRadioGroup(input.choices, name);
    else if (input.type === formInputTypes.checkList)
      item = generateCheckGroup(input.choices, name);
    else if (input.type === formInputTypes.radioTable)
      item = generateRadioTable(input.rows, input.columns, name);

    return (
      <TableRow>
        <TableCell align="left">{input.text} </TableCell>
        <TableCell align="left">{item}</TableCell>
        <TableCell align="left">
          {/* {errors.alsaqScore && <span>Lütfen bir değer giriniz</span>} */}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="modalBox">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input name="kilo" defaultValue="test" ref={register} /> */}

        <Table //className={classes.table}
          aria-label="simple table"
        >
          <TableBody>
            {Object.keys(formFields).map((name) => {
              const input = formFields[name];
              return generateFormInput(name, input);
            })}
          </TableBody>
        </Table>

        {/* <input type="submit"  value="KAYDET" /> */}
        <Button type="submit" color="secondary" variant="contained">
          KAYDET
        </Button>
      </form>
    </div>
  );
};
