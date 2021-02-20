import React from "react";
import Radio from "../atoms/Radio";

export default ({ list }) => {
  return (
    <div>
      {list.map((l) => (
        <Radio
          text={l.text}
          onChange={l.onChange} // value, checked
        />
      ))}

      <div>
        <Radio />
      </div>
    </div>
  );
};
