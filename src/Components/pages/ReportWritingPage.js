import React, { Component } from "react";
import ReportForm from "../organisms/ReportForm/ReportForm";
import ReportTemplate from "../templates/ReportTemplate";

class ReportWritingPage extends Component {
  
  componentDidMount() {}

  render() {
      
    return  <ReportTemplate
    // reportUid={this.props.match.params.uid}
     content={<ReportForm />}
   />
  }
}

export default ReportWritingPage;