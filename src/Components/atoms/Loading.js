import { CircularProgress, Backdrop } from "@material-ui/core";
import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <Backdrop style={{ zIndex: 99, color: "#fff" }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
}

export default Loading;
