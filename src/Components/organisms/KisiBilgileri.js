import React from "react";
import AppContext from "../../AppContext";
import PersonalDataCard from "./PersonalDataCard";

export default () => {
  const centralState = React.useContext(AppContext);

  if (centralState.selectedUser && centralState.selectedUser.rol) {
    return <div>
        <PersonalDataCard/>
    </div>;
  } else return null;
};

// const renderSecilmisKisi = () => {
//     if(centralState.selectedUser && centralState.selectedUser.rol )
//     switch (centralState.selectedUser.rol) {
//       case 1:
//         return <HastaListesi />;
//       case 2:
//         return <HastaListesi />;
//       case 3:
//         return <HemsireListesi />;
//       case 4:
//         return <AdminHocaListesi />;

//       default: return null;
//     }
//   };
