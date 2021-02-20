import React, { Component } from "react";
import NewReportModal from "../organisms/NewReportModal/NewReportModal";
import ReportTemplate from "../templates/ReportTemplate";

class ReportWritingPage extends Component {
  
  componentDidMount() {}

  render() {
      
    return  <ReportTemplate
    // reportUid={this.props.match.params.uid}
     content={<NewReportModal />}
   />
  }
}

export default ReportWritingPage;