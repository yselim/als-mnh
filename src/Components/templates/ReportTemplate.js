import React, { Component } from "react";
import Footer from "../organisms/Footer";
import ReportDataTable from "../organisms/ReportDataTable";

class ReportTemplate extends Component {
  // reportUid = this.props.reportUid;
  content = this.props.content;
  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "98vh",
          border: "solid",
        }}
      >
           <div style={{ display: "flex", height: "100%", justifyContent:"center" }}>
           {/* <ReportDataTable reportUid={this.reportUid} /> */}

           {this.content}
        </div>
       

        <Footer />
      </div>
    );
  }
}

export default ReportTemplate;
