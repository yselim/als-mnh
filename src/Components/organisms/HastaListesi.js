import React from "react";
import Tablo from "../molecules/Tablo";

const liste = [["Ahmet", "Yılmaz", "12345678910"]]; // context'teki state'e göre firebase'den çekilecek.

const kolonlar = [{ title: "Adı" }, { title: "Soyadı" }, { title: "Tc" }];

const tableProps = {
  titles: ["ADI", "SOYADI", "TC"],
  titleAligns: ["", "", "center"],
  texts: [
    ["Ahmet", "Yılmaz", "1234565678"],
    ["Bill", "Gates", "987654321"],
    ["Elon", "Musk", "1111111111"],
  ],
  textAligns: ["", "", "center"],
};

export default () => {
  return (
    <div>
      <Tablo tableProps={tableProps} />
    </div>
  );
};
