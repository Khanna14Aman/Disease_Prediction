import React, { useState } from "react";
import { cilAlignLeft } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import SideBar from "./SideBar";
import "../cssfile/Header.css";

const Header = ({ setSearchValue }) => {
  const [isSideBar, setSideBar] = useState(false);
  return (
    <div>
      {isSideBar && <SideBar setSideBar={setSideBar} />}
      <div className="navbar">
        <CIcon
          className="menuIcon"
          icon={cilAlignLeft}
          height={"3vh"}
          width={"3vh"}
          onClick={() => setSideBar(true)}
        />
        <input
          // style={{ height: "5vh", width: "15vw", fontSize: "3vh"  }}
          autoComplete="off"
          type="text"
          placeholder="search"
          id="search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;
