import { db } from "./config/firebaseConfig";

const kisileriCek = (filtre)=>{
    
    db.collection("kisiler")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data); // array of cities objects
    });
}

export {kisileriCek};