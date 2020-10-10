import React from "react";
import Label from "../atoms/Label";
import Radio from "../atoms/Radio";

export default ({ text, liste, onSelectionChange, selectedValue }) => {
  return (
    <div style={{textAlign:"left", border:"solid blue", width:""}}>
      <Label text={text} />
      {liste.map((radioText) => {
        return <Radio checked={selectedValue == radioText} value={radioText}  text={radioText} onChange={(newVal)=>onSelectionChange(newVal)} />;
      })}
    </div>
  );
};
