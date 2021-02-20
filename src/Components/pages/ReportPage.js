import React, { Component } from "react";
import ReportDataTable from "../organisms/ReportDataTable";
import ReportTemplate from "../templates/ReportTemplate";

class ReportPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <ReportTemplate
       // reportUid={this.props.match.params.uid}
        content={<ReportDataTable reportUid={this.props.match.params.uid} />}
      />
    );
  }
}

export default ReportPage;
