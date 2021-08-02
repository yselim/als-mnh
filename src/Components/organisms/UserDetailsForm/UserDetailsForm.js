import {
  Button,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { findUserByUid, pullUserDetails } from "../../../firestoreMethods";
import { useForm } from "react-hook-form";

import "./style.css";
import { formInputTypes } from "../../../constants";
import AppContext from "../../../AppContext";

const dataSources={
  1:"generalInfo",
  2:"detailInfo"
}

const hastaBilgileri = {
  kumeAdi: "KİŞİSEL BİLGİLER", liste: [
    {
      name: "Adı",
      inputType: formInputTypes.textInput,
      dataSource:1,
      dataName: "adi"
    },
    {
      name: "Soyadı",
      inputType: formInputTypes.textInput,
      dataSource:1,
      dataName: "soyadi"
    }, {
      name: "TC",
      inputType: formInputTypes.numberInput
    }, {
      name: "Doğum Tarihi",
      inputType: formInputTypes.dateInput
    },
    // {
    //   name:"Üye Mi",
    //   inputType:formInputTypes.radioList,
    //   choices:["Evet", "Hayır"]
    // },

    {
      name: "Üye No",
      inputType: formInputTypes.numberInput
    }, {
      name: "Teşhis",
      inputType: formInputTypes.textInput
    }, {
      name: "Teşhis Tarihi",
      inputType: formInputTypes.dateInput
    }, {
      name: "Cinsiyet",
      inputType: formInputTypes.radioList,
      choices: ["Erkek", "Kadın"],
      hideOtherOption: true
    }, {
      name: "Eğitim",
      inputType: formInputTypes.textInput
    },
  ]
};

const iletisimBilgileri = {
  kumeAdi: "İLETİŞİM BİLGİLERİ", liste: [

    {
      name: "Email",
      inputType: formInputTypes.textInput
    }, {
      name: "Hasta Telefon",
      inputType: formInputTypes.textInput
    }, {
      name: "Hasta Adresi",
      inputType: formInputTypes.textInput
    }, {
      name: "İl",
      inputType: formInputTypes.textInput
    }, {
      name: "İlçe",
      inputType: formInputTypes.textInput
    }, {
      name: "Doktoru",
      inputType: formInputTypes.textInput
    }, {
      name: "Hasta Yakını Adı-Soyadı",
      inputType: formInputTypes.textInput
    }, {
      name: "Hastas Yakını Email",
      inputType: formInputTypes.textInput
    }, {
      name: "Hasta Yakını Telefon",
      inputType: formInputTypes.textInput
    }]
};

const durumBilgileri = {
  kumeAdi: "PEG/TRAKESTOMİ DURUMU", liste: [

    {
      name: "Peg Tarihi",
      inputType: formInputTypes.dateInput
    },
    {
      name: "Peg No",
      inputType: formInputTypes.numberInput
    },
    {
      name: "Peg Markası",
      inputType: formInputTypes.textInput
    },
    {
      name: "Trakestomi Tarihi",
      inputType: formInputTypes.dateInput
    },
    {
      name: "Trakestomi No",
      inputType: formInputTypes.numberInput
    },
    {
      name: "Trakestomi Markası",
      inputType: formInputTypes.textInput
    }, {
      name: "Mama Markası",
      inputType: formInputTypes.textInput
    },
  ]
};

const sosyalDurum = {
  kumeAdi: "SOSYAL DURUM", liste: [
    {
      name: "Bakıcı Durumu",
      inputType: formInputTypes.textInput
    },
    {
      name: "Aylık Geliri",
      inputType: formInputTypes.textInput
    },
    {
      name: "Ev Durumu",
      inputType: formInputTypes.radioList,
      choices: ["Ev Sahibi", "Kiracı"]
    }, {
      name: "Bakım Yardımı vs. (Açıklamaları ve miktarı)",
      inputType: formInputTypes.textInput
    }, {
      name: "Burs",
      inputType: formInputTypes.textInput
    }, {
      name: "Hanedeki Kişi Sayısı",
      inputType: formInputTypes.numberInput
    },
    {
      name: "Çocuk Sayısı",
      inputType: formInputTypes.numberInput
    },
  ]
};




export default ({ uid }) => {
  const centralState = React.useContext(AppContext);
  const [params, setParams] = useState({generalInfo:{}, detailInfo:{}});

  const setParam = (key, value) => {
    setParams({
      ...params,
      [key]: value,
    });
  };

  useEffect(() => {
    pullUserInfo();
  }, []);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log("data: ", data)
    alert("Data kaydedilecek...");
  }

  // console.log(watch("example")); // watch input value by passing the name of it


  const pullUserInfo = async () => {
    const generalInfo = await findUserByUid(uid);
    const detailInfo = await pullUserDetails(uid);
    setParams({generalInfo, detailInfo});
  }



  const generateFormInput = (i) => {
    let item = null;


    let oldData = ""; 
    if(i.dataSource && i.dataName){
      let dataSource = params["generalInfo"];//dataSources[i.dataSource]
      oldData = dataSource && dataSource[i.dataName];
    }
      

    if (i.inputType === formInputTypes.numberInput)
      item = <input name={i.name} ref={register} type="number" />;
    else if (i.inputType === formInputTypes.textInput)
      item = <input name={i.name} ref={register} type="text" value={oldData} />;
    else if (i.inputType === formInputTypes.dateInput)
      item = <input name={i.name} ref={register} type="date" />;
    else if (i.inputType === formInputTypes.radioList)
      item = generateRadioGroup(i.choices, i.name, i.hideOtherOption);

      

    return (
      <TableRow key={"user_detail_form_input" + i.name}>
        <TableCell align="left">{i.name} </TableCell>
        <TableCell align="left">{item}</TableCell>
        <TableCell align="left">
          {/* {errors.alsaqScore && <span>Lütfen bir değer giriniz</span>} */}
        </TableCell>
      </TableRow>
    );
  };

  const generateRadioGroup = (list, name, hideOtherOption) => {
    return (
      <div>
        {list.map((text) => (
          <div className="radioAndLabelDiv">
            <input
              type="radio"
              name={name}
              value={text}
              ref={register}
              style={{ marginRight: 10 }}
            />
            <div>{text}</div>
          </div>
        ))}
        {!hideOtherOption && <div className="radioAndLabelDiv">
          <input
            type="radio"
            name={name}
            value={params[name]}
            ref={register}
            style={{ marginRight: 10 }}
          />
          <TextField
            placeholder="Diğer"
            variant="standard"
            value={params[name]}
            onChange={(t) => setParam(name, t.target.value)}
            size="small"
          />
        </div>}
      </div>
    );
  };


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

  const createTableFromList = (kume) => {
    return <div className="kume">
      <div className="kumeBasligi">{kume.kumeAdi}</div>
      <Table size="small">
        <TableBody>

          {
            kume.liste.map(i => generateFormInput(i))
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
