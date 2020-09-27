import React from "react";
import Label_combobox from "../molecules/Label_combobox";
import Label_radio from "../molecules/Label_radio";

export default () => {
  return (
    <div>
      <Label_radio
        text={"Gösterilecek Liste"}
        liste={["Adminler", "Hastalar", "Hemşireler", "Hocalar"]}
      />
    </div>
  );
};
