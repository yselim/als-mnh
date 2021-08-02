import { db, firebaseAuth, timeStamp } from "./config/firebaseConfig";
import "firebase/firestore";


const pullReportsOfPatient = async (patientUid) => {
  return await db
    .collection("raporlar")
    .where("hasta_uid", "==", patientUid)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {

        let report={...doc.data(), uid: doc.id };
        report.tarih= report.tarih.toDate().toLocaleDateString('tr-TR');

        return report;
      });
    });
};

const listenUsers = async (loggedOnUser, afterDataChangeFunction) => {
  if (loggedOnUser.role === 1) {
    let roles = [
      { id: 1, name: "admins" },
      { id: 2, name: "patients" },
      { id: 3, name: "nurses" },
      { id: 4, name: "docs" },
    ];

    roles.forEach((r) => {
      db.collection("kisiler")
        .where("rol", "==", r.id)
        .onSnapshot(function (querySnapshot) {
          var users = [];
          querySnapshot.forEach(function (doc) {
            users.push({ ...doc.data(), uid: doc.id });
          });
          afterDataChangeFunction(r.name, users);
        });
    });
  } else if (loggedOnUser.role === 3) {

// sisteme giren kişi hemşire ise, bu hemşirenin hastalarını çekcez:
// önce hasta-atama'dan hemşirenin hastalarını çekelim, sonra hastaları çekeriz.    
// bu da çözüm olmayacak. En iyisi hasta tablosunda her rowa hemşireler, hemşire tablosunda da her rowa hasta eklemeliyim. En garanti bu olacak...
// ararken de nested search ile tersten aricaz. 
    db.collection("kisiler")
        .where("rol", "==",2)
        .where
        .onSnapshot(function (querySnapshot) {
          var users = [];
          querySnapshot.forEach(function (doc) {
            users.push({ ...doc.data(), uid: doc.id });
          });
          afterDataChangeFunction("patients", users);
        });
    
      
  }
};


const pullReportsOfWriter = async (writerUid) => {
  return await db
    .collection("raporlar")
    .where("yazar_uid", "==", writerUid)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {

        let report={...doc.data(), uid: doc.id };
        report.tarih= report.tarih.toDate().toLocaleDateString('tr-TR');

        return report;
      });
    });
};

const pullAllReports = async () => {
  return await db
    .collection("raporlar")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        let report={...doc.data(), uid: doc.id };
        report.tarih= report.tarih.toDate().toLocaleDateString('tr-TR');

        return report;
      });
    });
};

const detachNurseAndPatient = async (nurseId, patientId) => {
  const p1= db.collection("kisiler").doc(patientId).set({
    hemsireler:{
      [nurseId]: false
    }
  }, {merge:true});

 const p2= db.collection("kisiler").doc(nurseId).set({
    hastalar:{
      [patientId]: false
    }
  }, {merge:true});

  return Promise.all([p1, p2]);
};

const insertNewUser = async (u) => {
  return await db.collection("kisiler").add(u);
};

const findUser = async (text, rol) => {
  // şu an sadece tc ile arama ekliyorum. sonradan isim-soyisim de olabilir.

  const queryWord = text.trim();
  return db
    .collection("kisiler")
    .where("rol", "==", rol)
    .where("tc", ">=", queryWord)
    .where("tc", "<=", queryWord + "\uf8ff")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { ...doc.data(), uid: doc.id };
      });
    });
};

const findUserByUid = async (uid) => {
  return db
    .collection("kisiler")
    .doc(uid)
    .get()
    .then((d) => {
      return { ...d.data(), uid: d.id };
    });
};

const pullUserDetails = async(uid)=>{
  return db
    .collection("kisi_detaylari")
    .doc(uid)
    .get()
    .then((d) => {
      return { ...d.data(), uid: d.id };
    });
}

const findReportByUid = async (uid) => {
  return db
    .collection("raporlar")
    .doc(uid)
    .get()
    .then((doc) => {
      let report={...doc.data(), uid: doc.id };
      report.tarih= report.tarih.toDate().toLocaleDateString('tr-TR');

      return report;
    });
};

const connectNurseAndPatient = (nurseId, patientId) => {

  const p1= db.collection("kisiler").doc(patientId).set({
    hemsireler:{
      [nurseId]: true
    }
  }, {merge:true});

 const p2= db.collection("kisiler").doc(nurseId).set({
    hastalar:{
      [patientId]: true
    }
  }, {merge:true});

  return Promise.all([p1, p2]);

  
};

const pullUsers = async (filter)=>{
  let query= db
  .collection("kisiler")
  .where("rol", "==", filter.rol);

  if(filter.rol===2 && filter.nurseUid){// aradığımız kişiler hasta ise, ve özellikle bir hemşirenin hastalarını istiyorsak:
    query=query.where(`hemsireler.${filter.nurseUid}`,"==", true);
  }

  if(filter.rol===3 && filter.patientUid){// aradığımız kişiler hemşire ise, ve özellikle bir hastaya atanmış hemşireleri istiyorsak
    query=query.where(`hastalar.${filter.patientUid}`,"==", true);
  }

  return query.get().then(ss=>{
    return ss.docs.map(d=>{
      return {...d.data(), uid:d.id};
    });
  });
  
}

const authUser = async (mail, pass) => {
  let user = {};
  await firebaseAuth
    .signInWithEmailAndPassword(mail, pass)
    .then((res) => {
      user = res.user;
    })
    .catch((error) => {
      console.log(error.message);
      alert(error.message);
    });

  return await db
    .collection("kisiler")
    .where("email", "==", user.email)
    .get()
    .then((querySnapshot) => {
      return { ...querySnapshot.docs[0].data(), uid: querySnapshot.docs[0].id };
    });
};

const listenAuthenticatedUserChanges = async (afterMethod) => {
  firebaseAuth.onAuthStateChanged(async (user) => {
    let userData = { rol: -1 };

    if (user)
      userData = await db
        .collection("kisiler")
        .where("email", "==", user.email)
        .get()
        .then((querySnapshot) => {
          return {
            ...querySnapshot.docs[0].data(),
            uid: querySnapshot.docs[0].id,
          };
        });

    afterMethod(userData);
  });
};

const logout = (afterMethod) => {
  firebaseAuth.signOut().then(
    function () {
      afterMethod();
    },
    function (error) {
      alert("Logut esnasında hata oldu: ", error);
    }
  );
};

const addReport = (reportData) =>{
  reportData.tarih= timeStamp;

  return  db.collection("raporlar").add(reportData);
}

export {
  listenUsers,
  pullReportsOfPatient,
  pullReportsOfWriter,
  pullAllReports,
  insertNewUser,
  detachNurseAndPatient,
  findUser,
  connectNurseAndPatient,
  findUserByUid,
  pullUserDetails,
  findReportByUid,
  authUser,
  listenAuthenticatedUserChanges,
  logout,
  pullUsers,
  addReport
};
