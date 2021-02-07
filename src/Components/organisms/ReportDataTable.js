import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import React, { Component } from "react";
import { findReportByUid, findUserByUid } from "../../firestoreMethods";
import Loading from "../atoms/Loading";

class ReportDataTable extends Component {
  reportUid = this.props.reportUid;

  constructor(props) {
    super(props);
    this.state = {
      patient:{},
      writer:{},
      reportData:{},
      isFetchingSomething : false,

    };
  }

  componentDidMount() {
    this.pullData();
  }

  pullData = async ()=>{
    
    this.setState({isFetchingSomething:true});
    const reportData = await findReportByUid(this.reportUid);
    const patient = await findUserByUid(reportData.hasta_uid);
    const writer = await findUserByUid(reportData.yazar_uid);
    this.setState({
        isFetchingSomething:false,
        reportData,
        patient,
        writer
    });

    console.log(reportData);
    console.log(patient);
    console.log(writer);

    
  };

  render() {
      const {patient, writer, reportData, isFetchingSomething} = this.state;

    const rows=[
        ["Hasta Adı-Soyadı", patient.adi + " "+ patient.soyadi],
        ["Hasta TC", patient.tc],
        ["Yazar Adı-Soyadı", writer.adi + " "+writer.soyadi],
        ["Yazar TC", writer.tc],
        ["Rapor Tarihi", reportData.tarih],
        ["Notlar", reportData.notlar]


    ];
      
    return <div>
        {isFetchingSomething && <Loading/>}
        <Table //className={classes.table}
        aria-label="simple table"
      >
       
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i + "rapor_rowu"}>
              <TableCell align="left">{row[0]} </TableCell>
              <TableCell align="left">{row[1]} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>;
  }
}

export default ReportDataTable;
