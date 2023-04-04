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
        <Button
          variant="outline-primary"
          style={{ border: "none" }}
          onClick={() => setSideBar(false)}
        >
          <CIcon icon={cilArrowThickLeft} height={20} width={20} />
        </Button>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outline-primary"
            style={{ border: "none" }}
            onClick={() => navigate("/profile")}
          >
            Update Profile
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outline-primary"
            style={{ border: "none" }}
            onClick={Logout}
          >
            Logout
          </Button>
        </div>
        {/* <div>SideBar</div> */}
      </div>
    </>
  );
};

export default SideBar;
