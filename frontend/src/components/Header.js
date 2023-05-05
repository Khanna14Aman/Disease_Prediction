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
          height={20}
          width={20}
          onClick={() => setSideBar(true)}
        />
        <input
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
