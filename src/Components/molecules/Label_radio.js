import React from "react";
import Label from "../atoms/Label";
import Radio from "../atoms/Radio";

export default ({ text, liste }) => {
  return (
    <div style={{textAlign:"left", border:"solid blue", width:""}}>
      <Label text={text} />
      {liste.map((radioText) => {
        return <Radio text={radioText} />;
      })}
    </div>
  );
};
