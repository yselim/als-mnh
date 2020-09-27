import React from "react";

function Column({ children, style }) {
  return (
    <div style={{...style, display:"flex", flexDirection:"column" }}>
      {children.map((c) => {
        return c;
      })}
    </div>
  );
}

export default Column;
