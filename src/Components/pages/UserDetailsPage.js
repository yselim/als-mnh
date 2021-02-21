import React, { Component } from "react";
import UserDetailsForm from "../organisms/UserDetailsForm/UserDetailsForm";
import ReportTemplate from "../templates/ReportTemplate";

class UserDetailsPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <ReportTemplate
       // reportUid={this.props.match.params.uid}
        content={<UserDetailsForm uid={this.props.match.params.uid} />}
      />
    );
  }
}

export default UserDetailsPage;
