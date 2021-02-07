import React from "react";
import Radio from "../atoms/Radio";

export default ({ text, liste, onSelectionChange, selectedValue }) => {
  return (
    <div
      style={{
    
        display: "flex",
        alignItems:"center"
        //flexDirection: "column",
      }}
    >
      <label>{text} </label>
      {liste.map((radioText, index) => {
        return (
          <Radio
            key={radioText + index}
            checked={selectedValue === radioText}
            value={radioText}
            text={radioText}
            onChange={(newVal) => onSelectionChange(newVal)}
          />
        );
      })}
    </div>
  );
};
