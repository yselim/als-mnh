import React from "react";
import Radio from "../atoms/Radio";

export default ({ text, liste, onSelectionChange, selectedValue }) => {
  return (
    <div style={{textAlign:"left", border:"solid blue", display:"flex", flexDirection:"column"}}>
      <label>{text} </label>
      {liste.map((radioText) => {
        return <Radio checked={selectedValue == radioText} value={radioText}  text={radioText} onChange={(newVal)=>onSelectionChange(newVal)} />;
      })}
    </div>
  );
};
