import React from "react";
import { Button } from "react-bootstrap";
import "../cssfile/ShowResult.css";

const ShowResult = ({ result, setresult }) => {
  return (
    <>
      <div className="outer-div1">
        <div className="outer-div2">
          <div className="outer-div2a">Hey your results are here...</div>
          <div className="outer-div2b">
            We are very regret to inform you that you are suffering from
            following :
          </div>
          <div className="outer-div2c">{result}</div>
          <div className="outer-div2d">Get Well Soon....</div>
          <div className="button">
            <Button onClick={() => setresult("")} style={{ fontSize: "3vh" }}>
              OK
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowResult;
