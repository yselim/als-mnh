import { Container, Grid, Paper } from "@material-ui/core";
import React, { Component } from "react";
import AdminIslemSecici from "../organisms/AdminIslemSecici";
import Footer from "../organisms/Footer";

class PiTemplate extends Component {
  componentDidMount() {}

  render() {
    const { leftColumn, rightColumn, topBar } = this.props;

    const boxStyle = {
      padding: 10,
      border: "solid black 1px",
      borderRadius: 15,
    };

    return (
      <Container style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Grid container spacing={3} style={{}}>
          <Grid item xs={12}>
            <div style={boxStyle}>{topBar}</div>
          </Grid>
          {leftColumn && (
            <Grid item xs={12} sm={6}>
              <div style={boxStyle}>{leftColumn}</div>
            </Grid>
          )}
          {rightColumn && (
            <Grid item xs={12} sm={6}>
              <div style={boxStyle}>{rightColumn}</div>
            </Grid>
          )}
        </Grid>
        
      </Container>
    );
  }
}

export default PiTemplate;
