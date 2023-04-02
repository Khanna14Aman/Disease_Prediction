import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "../cssfile/LandingPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const LandingPage = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      navigate("/filldata");
    }
  }, [navigate, userInfo]);
  return (
    <>
      <div className="main">
        <Container>
          <Row>
            <div className="intro-text">
              <div>
                <h1 className="title">welcome to Disease Prediction App</h1>
                <p className="subtitle" style={{ fontWeight: "bold" }}>
                  Stay Healthy
                </p>
              </div>
              <div className="buttonContainer">
                <Link to="/login">
                  <Button
                    size="lg"
                    className="landingButton"
                    variant="outline-primary"
                    style={{ border: "none", fontWeight: "bold" }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="lg"
                    className="landingButton"
                    variant="outline-primary"
                    style={{ border: "none", fontWeight: "bold" }}
                  >
                    SignUp
                  </Button>
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};
