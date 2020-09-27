
import React from "react";

export default ({kolonlar, veriler}) => {
  return (
    <div>
        {veriler.map((veri)=>{
            return <div> 
                {veri.adi}
                {veri.soyadi}
                {veri.id}
                {veri.tc}
            </div>

        })}
    </div>
  );
};

