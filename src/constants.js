
export const ROLLER = {
    admin: {name:"Yönetici", id:1},
    hasta: {name:"Hasta", id:2},
    hemsire: {name:"Hemşire", id:3},
    hoca: {name:"Hoca", id:4},
};

export const ADMIN_ISLEM_LISTESI = ["Yöneticiler", "Hastalar", "Hemşireler", "Hocalar", "Raporlar"];
export const HEMSIRE_ISLEM_LISTESI = ["Hastalar", "Raporlar"];


export const formInputTypes= {
    numberInput: "numberInput",
    radioList:"radioList",
    checkList: "checkList",
    radioTable:"radioTable",
    textInput: "textInput",
    dateInput : "dateInput",
    

}

export const formFields = {

    kg:{
        text:"Kilo (kg)",
        type: formInputTypes.numberInput
    },

    beslenme:{
        text: "Beslenme",
        type: formInputTypes.radioList,
        choices: ["Ağızdan", "Nazogastrik tüp", "PEG"],
        hasOther: true
    },
    solunum:{
        text: "Solunum",
        type: formInputTypes.radioList,
        choices: ["Cihaz kullanmıyor", "Maske ile Bipap", "Trakeostomi"],
        hasOther: true
    },

    konusma:{
        text: "Konuşma",
        type: formInputTypes.radioList,
        choices: ["Cihaz kullanmıyor", "Maske ile Bipap", "Trakeostomi"],
    },
    iletisimYontemi:{
        text: "İletişim Yöntemi",
        type: formInputTypes.checkList,
        choices:[
            "İletişim sorunu yok",
            "El yazısı var",
            "Alfabe tablosu",
            "Dudak okuma",
            "Göz kırpma",
            "Lazer işaretleyici",
            "Akıllı telefon",
            "Tablet",
            "Bilgisayar / sanal klavye",
            "Eyetouch gözlük",
            "Smartnav",
            "Glassouse",
            "Smarttekas göz bilgisayarı",
            "Tobii Dynavox göz bilgisayarı",
            "Tabii 4c / Opti,key / Windows",
          ]
    },
    alsqOptions:{
        text:"Son 2 haftada karşılaşılan güçlüklerin ne sıklıkta olduğunu işaretleyiniz. (ALSAQ-5)",
        type:formInputTypes.radioTable,
        columns: ["Hiçbir zaman", "Nadiren", "Bazen", "Her Zaman"],
        rows:["Ayakta durmakta güçlük yaşarım",
        "Kollarımı ve  ellerimi kullanmada güçlük yaşarım",
        "Katı gıdaları yemekte güçlük yaşarım",
        "Konuşmamın kolay anlaşılmadığını hissederim",
        "Gelecek hakkında umutsuzum",
      
      ],
    },
    alsaqScore:{
        text:"ALSAQ-5 skoru",
        type: formInputTypes.numberInput
    },

};