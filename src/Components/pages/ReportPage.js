import React, { Component } from "react";
import ReportTemplate from "../templates/ReportTemplate";

class ReportPage extends Component {
  
  componentDidMount() {}

  render() {
    return <ReportTemplate reportUid={this.props.match.params.uid} />;
  }
}

export default ReportPage;
