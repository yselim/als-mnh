import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import React, { Component } from "react";
import { formFields, formInputTypes } from "../../constants";
import { findReportByUid, findUserByUid } from "../../firestoreMethods";
import Loading from "../atoms/Loading";

class ReportDataTable extends Component {
  reportUid = this.props.reportUid;

  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      writer: {},
      reportData: {},
      isFetchingSomething: false,
    };
  }

  componentDidMount() {
    this.pullData();
  }

  pullData = async () => {
    this.setState({ isFetchingSomething: true });
    const reportData = await findReportByUid(this.reportUid);
    const patient = await findUserByUid(reportData.hasta_uid);
    const writer = await findUserByUid(reportData.yazar_uid);
    this.setState({
      isFetchingSomething: false,
      reportData,
      patient,
      writer,
    });
  };

  generateFormFields = (reportData) => {
    const dataRows = Object.keys(formFields).map((name) => {
      const input = formFields[name];

      let values = [];

      if (
        input.type === formInputTypes.numberInput ||
        input.type === formInputTypes.radioList
      ) {
        values.push(reportData[name]);
      } else if (input.type === formInputTypes.checkList) {
        input.choices.forEach((c) => {
          let checked = reportData[c];
          if (checked) values.push(c);
        });

        const otherName = "Diğer " + name;
        if (reportData[otherName]) values.push(reportData[otherName]);
      } else if (input.type === formInputTypes.radioTable) {
        input.rows.forEach((r) => {
          const str = r + " : " + reportData[r];
          values.push(str);
        });
      }

      return [input.text, values];
    });

    return dataRows.map((dr, i) => {
      const name = dr[0];
      const values = dr[1];

      let value =
        values.length === 1 ? values[0] : values.map((v) => <ul>{v}</ul>);

      return (
        <TableRow key={i + "rapor_input_rowlari"}>
          <TableCell align="left" style={{width:300}}>{name} </TableCell>
          <TableCell align="left">{value} </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    const { patient, writer, reportData, isFetchingSomething } = this.state;

    console.log("reportData: ", reportData);
    const rows = [
      ["Hasta Adı-Soyadı", patient.adi + " " + patient.soyadi],
      ["Hasta TC", patient.tc],
      ["Yazar Adı-Soyadı", writer.adi + " " + writer.soyadi],
      ["Yazar TC", writer.tc],
      ["Rapor Tarihi", reportData.tarih],
    ];

    return (
      <div>
        {isFetchingSomething && <Loading />}
        <Table //className={classes.table}
          aria-label="simple table"
        >
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i + "rapor_rowu"}>
                <TableCell align="left"  style={{width:300}}>{row[0]} </TableCell>
                <TableCell align="left">{row[1]} </TableCell>
              </TableRow>
            ))}
            {this.generateFormFields(reportData)}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ReportDataTable;
