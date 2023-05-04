import React from "react";
import "../cssfile/Sidebar.css";
import CIcon from "@coreui/icons-react";
import { Button } from "react-bootstrap";
import { logout } from "../actions/useractions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cilArrowThickLeft } from "@coreui/icons";
const SideBar = ({ setSideBar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <div className="SideBar-main">
        <CIcon
          className="back-icon"
          icon={cilArrowThickLeft}
          height={"3vh"}
          width={"3vh"}
          onClick={() => setSideBar(false)}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outline-secondary"
            style={{ border: "none", width: "100%", fontSize: "3vh" }}
            onClick={() => navigate("/profile")}
          >
            <strong>Update Profile</strong>
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outline-secondary"
            style={{ border: "none", width: "100%", fontSize: "3vh" }}
            onClick={Logout}
          >
            <strong>Logout</strong>
          </Button>
        </div>
        {/* <div>SideBar</div> */}
      </div>
    </>
  );
};

export default SideBar;
