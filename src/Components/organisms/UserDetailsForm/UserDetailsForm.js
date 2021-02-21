import {
    Button,
    TextField,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
  } from "@material-ui/core";
  import React, { useState } from "react";
  import { findUser, connectNurseAndPatient } from "../../../firestoreMethods";
  import { useForm } from "react-hook-form";
  
  import "./style.css";
  
  const hastaBilgileri = {kumeAdi:"KİŞİSEL BİLGİLER", liste:[
    {
      name:"Adı",
      inputType:"text"
    },
    {
      name:"Soyadı",
      inputType:"text"
    },{
      name:"TC",
      inputType:"number"
    },{
      name:"Doğum Tarihi",
      inputType:"date"
    },{
      name:"Üye Mi",
      inputType:"radio",
      choices:["Evet", "Hayır"]
    },{
      name:"Üye No",
      inputType:"number"
    },{
      name:"Teşhis",
      inputType:"text"
    },{
      name:"Teşhis Tarihi",
      inputType:"date"
    },{
      name:"Cinsiyet",
      inputType:"radio",
      choices:["Erkek", "Kadın"]
    },{
      name:"Eğitim",
      inputType:"text"
    },
  ]};

  const iletisimBilgileri ={kumeAdi:"İLETİŞİM BİLGİLERİ", liste:[
    
    {
      name:"Email",
      inputType:"text"
    },{
      name:"Hasta Telefon",
      inputType:"text"
    },{
      name:"Hasta Adresi",
      inputType:"text"
    },{
      name:"İl",
      inputType:"text"
    },{
      name:"İlçe",
      inputType:"text"
    },{
      name:"Doktoru",
      inputType:"text"
    },{
      name:"Hasta Yakını Adı-Soyadı",
      inputType:"text"
    },{
      name:"Hastas Yakını Email",
      inputType:"text"
    },{
      name:"Hasta Yakını Telefon",
      inputType:"text"
    }]};

    const durumBilgileri ={kumeAdi:"DURUM BİLGİSİ", liste:[
    
    {
      name:"Bakıcı Durumu",
      inputType:"text"
    },{
      name:"Peg Tarihi",
      inputType:"date"
    },
    {
      name: "Peg No",
      inputType:"number"
    },
    {
      name:"Peg Markası",
      inputType:"text"
    },
    {
      name:"Trakestomi Tarihi",
      inputType:"date"
    },
    {
      name: "Trakestomi No",
      inputType:"number"
    },
    {
      name:"Trakestomi Markası",
      inputType:"text"
    },{
      name:"Mama Markası",
      inputType:"text"
    },
  ]};

  const sosyalDurum = {kumeAdi:"SOSYAL DURUM", liste:[
    {
      name:"Aylık Geliri",
      inputType:"text"
    },
    {
      name:"Ev Durumu",
      inputType:"radio",
      choices:["Ev Sahibi", "Kiracı"]
    },{
      name:"Bakım Yardımı vs. (Açıklamaları ve miktarı)",
      inputType:"text"
    },{
      name:"Burs",
      inputType:"text"
    },{
      name:"Hanedeki Kişi Sayısı",
      inputType:"number"
    },
    {
      name:"Çocuk Sayısı",
      inputType:"number"
    },
  ]};


  export default ({ uid }) => {
    const [params, setParams] = useState({});
  
    const setParam = (key, value) => {
      setParams({
        ...params,
        [key]: value,
      });
    };
  
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => alert("Data kaydedilecek...");
  
    // console.log(watch("example")); // watch input value by passing the name of it
  
    const generateRadioTable = (rowNames, columnNames, name) => {
      return (
        <Table //className={classes.table}
          aria-label="simple table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {columnNames.map((c) => (
                <TableCell align="center">{c}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ border: "0px" }}>
            {rowNames.map((r) => (
              <TableRow>
                <TableCell>{r}</TableCell>
                {columnNames.map((c) => (
                  <TableCell align="center">
                    <input
                      type="radio"
                      name={r}
                      //value={text}
                      ref={register}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    };

    const createTableFromList = (kume)=>{
        return  <div className="kume">
          <div className="kumeBasligi">{kume.kumeAdi}</div>
          <Table size="small">
        <TableBody>

          {
            kume.liste.map(i=>{
              return <TableRow>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.inputType}</TableCell>
    
            </TableRow>
            })
          }
          
        </TableBody>
      </Table>
      </div>
    }
  
  
    const cihazEnvanteri = (
      <div className="kume">
         <div className="kumeBasligi">{"CiHAZ ENVANTERİ"}</div>
      <Table //className={classes.table}
      aria-label="simple table"
    >
      <TableBody>
      <TableRow>
        {/* <TableCell align="left">{"Cihaz Envanteri"} </TableCell> */}
        <TableCell align="left">
          {generateRadioTable(
            ["Solunum cihazı", 
            "Aspiratör", 
            "Aspiratör (Akülü)", 
            "Öksürük yardımcısı (Cough assist)",
            "Oksijen konsantratörü",
            "Havalı yatak",
            "Pulse oksimetre",
            "Motorlu karyola",
            "Manuel tekerlekli sandalye",
            "Özellikli tekerlekli sandalye",
            "Akülü sandalye",
            "Hasta taşıma lifti",
            "Jeneratör",
            "Wc-banyo sandalyesi",
            "Mama pompası",
            "Yürüteç",
            "Elektrikli nemlendirici",
            "Tekli solunum devresi",
            "Çiftli solunum devresi",
            "Aspirasyon sondası",
            "Bakteri filtresi",
            "HME filtre",
            "Kesintisiz Güç Kaynağı (UPS)",
            "Koltuk değneği, kanadiyen",
          
          ],
            ["Dernekten", "Kendisi temin Etti", "SGK"],
            "cihaz_temini"
          )}
        </TableCell>
        <TableCell align="left">
          {errors.iletisim_yontemi && <span>Lütfen bir değer seçiniz</span>}
        </TableCell>
      </TableRow>
      </TableBody>
          </Table>
          </div>
    );
  

    return (
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          {/* <input name="kilo" defaultValue="test" ref={register} /> */}
  
          {createTableFromList(hastaBilgileri)}
          {createTableFromList(iletisimBilgileri)}
          {createTableFromList(durumBilgileri)}
          {createTableFromList(sosyalDurum)}

          {cihazEnvanteri}
          
  
          {/* <input type="submit"  value="KAYDET" /> */}
          <Button type="submit" color="secondary" variant="contained">
            KAYDET
          </Button>
        </form>
      </div>
    );
  };
  