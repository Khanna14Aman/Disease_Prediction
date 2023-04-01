import React from "react";
import "../cssfile/SelectValuse.css";

const SelectValues = ({ name, objectValues, setValues }) => {
  return (
    <>
      {/* <div>{objectValues[name]}</div> */}
      <div className="outerdiv">
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
            <option value="0">no</option>
            <option value="1">yes</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default SelectValues;
