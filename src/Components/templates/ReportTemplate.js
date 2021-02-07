import React, { Component } from "react";
import Footer from "../organisms/Footer";
import ReportDataTable from "../organisms/ReportDataTable";

class ReportTemplate extends Component {
  reportUid = this.props.reportUid;
  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "98vh",
          border: "solid",
        }}
      >
           <div style={{ display: "flex", height: "100%", justifyContent:"center" }}>
           <ReportDataTable reportUid={this.reportUid} />
        </div>
       

        <Footer />
      </div>
    );
  }
}

export default ReportTemplate;
