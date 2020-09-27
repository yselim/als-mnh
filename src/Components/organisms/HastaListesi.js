import React from "react";
import Tablo from "../atoms/Tablo";

const liste = [
  { adi: "Ahmet", soyadi: "YILMAZ", tc: "1234556", id: "1" },
  { adi: "Ali", soyadi: "VELİ", tc: "1234556", id: "2" },
  { adi: "Veli", soyadi: "DENEME", tc: "1234556", id: "3" },
  { adi: "Bill", soyadi: "GATES", tc: "1234556", id: "4" },
  { adi: "Elon", soyadi: "MUSK", tc: "1234556", id: "5" },
  { adi: "Polat", soyadi: "ALEMDAR", tc: "1234556", id: "6" },
]; // context'teki state'e göre firebase'den çekilecek.
export default () => {
  return <div>
      <Tablo veriler={liste} />
  </div>;
};
