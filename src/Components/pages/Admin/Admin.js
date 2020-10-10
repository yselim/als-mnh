import React, { Component } from "react";
import AppContext from "../../../AppContext";
import { ROLLER } from "../../../constants";
import { kisileriCek } from "../../../firestoreMethods";
import AdminHocaListesi from "../../organisms/AdminHocaListesi";
import HastaListesi from "../../organisms/HastaListesi";
import HemsireListesi from "../../organisms/HemsireListesi";
import RaporListesi from "../../organisms/RaporListesi";
import AdminTemplate from "../../templates/AdminTemplate";

// const listeTurleri = {...ROLLER, rapor:"rapor"};

// class Admin extends Component {
//   static contextType = AppContext;

//   constructor() {
//     super();

//     this.state = {
//       gosterilecekListeAdi: ""
//     };
//   }

//   componentDidMount() {
//     kisileriCek();
//   }

//   renderProperList = ()=>{
//     alert(this.context.selectedList);
//      switch (this.context.selectedList){
//       case "Yöneticiler": return <AdminHocaListesi/> ;
//       case "Hastalar": return <HastaListesi/>;

//     }

//   }

//   render() {
//     return (
//      <div>
//       <AdminTemplate
//          kisiListesi = {this.renderProperList}
//          secilenKisiBilgileri ={null}
//          />
//      </div>
//     );
//   }
// }

const Admin = () => {
  const centralState = React.useContext(AppContext);

  const renderProperList = () => {
    switch (centralState.selectedList) {
      case "Yöneticiler":
        return <AdminHocaListesi />;
      case "Hastalar":
        return <HastaListesi />;
      case "Hemşireler":
        return <HemsireListesi/>
      case "Hocalar":
        return <AdminHocaListesi />;
      case "Raporlar":
        return <RaporListesi/>;
    }

  };



  return (
    <div>
      <AdminTemplate
        kisiListesi={renderProperList()}
        secilenKisiBilgileri={null}
      />
    </div>
  );
};

export default Admin;
