import React, { Component, useEffect } from "react";
import AppContext from "../../AppContext";

import HocaListesi from "../organisms/HocaListesi";
import AdminListesi from "../organisms/AdminListesi";
import HastaListesi from "../organisms/HastaListesi";
import HemsireListesi from "../organisms/HemsireListesi";
import KisiBilgileri from "../organisms/KisiBilgileri";
import RaporListesi from "../organisms/RaporListesi";
import AdminTemplate from "../templates/AdminTemplate";
import PiTemplate from "../templates/PiTemplate";
import TopBar from "../organisms/TopBar";



const AdminPage = () => {
  const centralState = React.useContext(AppContext);

  useEffect(() => {}, []);

  const renderProperList = () => {
    switch (centralState.selectedList) {
      case "Yöneticiler":
        return <AdminListesi />;
      case "Hastalar":
        return <HastaListesi />;
      case "Hemşireler":
        return <HemsireListesi />;
      case "Hocalar":
        return <HocaListesi />;
      case "Raporlar":
        return <RaporListesi />;
      default: return null;
    }
  };

 
  return <PiTemplate 
    topBar={<TopBar />} 
    leftColumn={renderProperList()} 
    rightColumn={<KisiBilgileri />}
  />;

};

export default AdminPage;
