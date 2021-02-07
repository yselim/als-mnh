import React, { Component } from "react";
import AdminIslemSecici from "../organisms/AdminIslemSecici";
import Footer from "../organisms/Footer";

class AdminTemplate extends Component {
  componentDidMount() {}

  render() {
    const { kisiListesi, secilenKisiBilgileri } = this.props;

    const solKolon = (
      <div key="sol_kolon" style={{ width: "50%" }}>
        {kisiListesi}
      </div>
    );

    const sagKolon = (
      <div key="sag_kolon" style={{ width: "50%" }}>
        {secilenKisiBilgileri}
      </div>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "98vh",
         
        }}
      >
        <AdminIslemSecici />
        <div style={{ display: "flex", height: "100%" }}>
          {solKolon}
          {sagKolon}
        </div>

        <Footer />
      </div>
    );
  }
}

export default AdminTemplate;
