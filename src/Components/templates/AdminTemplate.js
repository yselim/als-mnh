import React, { Component } from "react";
import Column from "../atoms/Column";
import Row from "../atoms/Row";
import AdminIslemSecici from "../organisms/AdminIslemSecici";
import Footer from "../organisms/Footer";

class AdminTemplate extends Component {
  componentDidMount() {}

  render() {
    const { kisiListesi, secilenKisiBilgileri } = this.props;

    const solKolon = <div style={{width:"50%"}}>{kisiListesi}</div>;

    const sagKolon = <div style={{width:"50%", border:"solid red"}}>{secilenKisiBilgileri}</div>;

    return (
      <Column
        style={{ height: "98vh", border: "solid" }}
        children={[
          <AdminIslemSecici />,
          <Row style={{ height: "100%" }} children={[solKolon, sagKolon]} />,
          <Footer />,
        ]}
      />
    );
  }
}

export default AdminTemplate;
