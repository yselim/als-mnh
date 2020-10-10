
import React from "react";
import Radio from '@material-ui/core/Radio';

export default ({text, checked, onChange, value }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
          <Radio
            checked={checked}
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
            }}
          />
          <span>{text}</span>
        </div>
  );
};

