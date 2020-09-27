import React from "react";

function Row({ children, style }) {
  return (
    <div style={{...style, display:"flex", flexDirection:"row" }}>
      {children.map((c) => {
        return c;
      })}
    </div>
  );
}

export default Row;
