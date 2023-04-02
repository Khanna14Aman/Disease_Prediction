import React, { useEffect, useState } from "react";
import "../cssfile/SelectValuse.css";

const SelectValues = ({ name, objectValues, setValues }) => {
  return (
    <>
      {/* <div>{objectValues[name]}</div> */}
      <div className="outerdiv">
        {/* <div>{objectValues[name]}</div> */}
        <div className="firstdiv">{name}</div>
        <div className="seconddiv">
          <select
            className="selectdiv"
            onChange={(e) =>
              setValues((previousValues) => {
                return { ...previousValues, [name]: e.target.value };
              })
            }
          >
            {objectValues[name] == 0 && (
              <>
                <option value="0">NO</option>
                <option value="1">YES</option>
              </>
            )}
            {objectValues[name] == 1 && (
              <>
                <option value="1">YES</option>
                <option value="0">NO</option>
              </>
            )}
          </select>
        </div>
      </div>
    </>
  );
};

export default SelectValues;
