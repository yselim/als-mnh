import React, { Component } from "react";
import { ROLLER } from "../../../constants";
import { kisileriCek } from "../../../firestoreMethods";
import {HastaListesi} from "../../organisms";
import AdminTemplate from "../../templates/AdminTemplate";

const listeTurleri = {...ROLLER, rapor:"rapor"};
class Admin extends Component {
  
  constructor() {
    super();
    
    this.state = {
      gosterilecekListeAdi: ""
    };
  }

  componentDidMount() {
    kisileriCek();
  }
  
  render() {
    return (
     <div>
      <AdminTemplate
         kisiListesi = {<HastaListesi/>} 
         secilenKisiBilgileri ={null}
         />
     </div>
    );
  }
}

export default Admin;
