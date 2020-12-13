import { db } from "./config/firebaseConfig";

const kisileriCek = (filtre)=>{
    
    db.collection("kisiler")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data); // array of cities objects
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
          console.log("doc.data(): ", doc.data());
          users.push({...doc.data(), uid: doc.id});
        });
        afterDataChangeFunction(r.name, users);
    });
  });

  

    
}

export {kisileriCek, listenUsers};