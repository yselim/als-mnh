import { db } from "./config/firebaseConfig";
import 'firebase/firestore';
import firebase from 'firebase/app';


const kisileriCek = (filtre)=>{
    
    db.collection("kisiler")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
    });
}

const pullNursesOfPatient= async (patientUid)=>{

  const hemsire_uids= await db.collection("hasta_atama")
  .where("hasta_uid", "==", patientUid)
  .get()
  .then(querySnapshot => {
    return querySnapshot.docs.map(doc => doc.data().hemsire_uid);
  });


  if(hemsire_uids.length>0){
    return await db.collection("kisiler")
    .where( firebase.firestore.FieldPath.documentId(), "in", hemsire_uids)
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
  }
  else 
  return [];
}

const pullReportsOfPatient= async (patientUid)=>{

  return await db.collection("raporlar")
  .where("hasta_uid", "==",patientUid )
  .get()
  .then(querySnapshot => {
    return querySnapshot.docs.map(doc => doc.data());
  });

}

const listenUsers = (afterDataChangeFunction) =>{
  const roles = [
    {id: 1, name: "admins"},
    {id: 2, name: "patients"},
    {id: 3, name: "nurses"},
    {id: 4, name: "docs"}

  ];

  roles.forEach((r)=>{
    db.collection("kisiler").where("rol", "==", r.id)
    .onSnapshot(function(querySnapshot) {
    
        var users = [];
        querySnapshot.forEach(function(doc) {
          users.push({...doc.data(), uid: doc.id});
        });
        afterDataChangeFunction(r.name, users);
    });
  });

  

    
}

const pullPatientsOfNurse= async (nurseUid)=>{

const patient_uids= await db.collection("hasta_atama")
.where("hemsire_uid", "==", nurseUid)
.get()
.then(querySnapshot => {
  return querySnapshot.docs.map(doc => doc.data().hemsire_uid);
});


if(patient_uids.length>0){
  return await db.collection("kisiler")
  .where( firebase.firestore.FieldPath.documentId(), "in", patient_uids)
  .get()
  .then(querySnapshot => {
    return querySnapshot.docs.map(doc => doc.data());
  });
}
else 
return [];
}

const pullReportsOfWriter= async (writerUid)=>{

  return await db.collection("raporlar")
  .where("yazar_uid", "==",writerUid )
  .get()
  .then(querySnapshot => {
    return querySnapshot.docs.map(doc => doc.data());
  });

}


const pullAllReports = async ()=>{

  return await db.collection("raporlar")
  .get()
  .then(querySnapshot => {
    return querySnapshot.docs.map(doc => doc.data());
  });

}


const insertNewUser = async (u)=>{

  return await db.collection("kisiler").add(u);
  

}


export {kisileriCek, listenUsers, pullNursesOfPatient, pullReportsOfPatient, pullPatientsOfNurse, pullReportsOfWriter, pullAllReports, insertNewUser};