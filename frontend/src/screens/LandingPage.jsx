import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "../cssfile/LandingPage.css";
import { useNavigate } from "react-router-dom";
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
                <p className="subtitle">Stay Healthy</p>
              </div>
              <div className="buttonContainer">
                <a href="/login">
                  <Button
                    size="lg"
                    className="landingButton"
                    variant="outline-primary"
                  >
                    Login
                  </Button>
                </a>
                <a href="/register">
                  <Button
                    size="lg"
                    className="landingButton"
                    variant="outline-primary"
                  >
                    SignUp
                  </Button>
                </a>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};
