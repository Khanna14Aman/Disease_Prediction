import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
    <Container fluid className="main">
      <Row>
        <Col md={1} lg={1} sm={0}></Col>
        <Col
          md={10}
          lg={10}
          sm={12}
          style={{ textAlign: "center", marginTop: "5vh" }}
        >
          <h1 className="title">welcome to Disease Prediction App</h1>
        </Col>
      </Row>
      <Row style={{ textAlign: "center", marginTop: "2vh" }}>
        <p className="subtitle" style={{ fontWeight: "bold" }}>
          Stay Healthy
        </p>
      </Row>
      <Row className="login-row">
        <Col lg={6} md={6} sm={6}>
          <Link to="/login">
            <Button
              size="lg"
              variant="secondary"
              style={{ fontWeight: "bold", width: "100%", fontSize: "3vh" }}
            >
              Login
            </Button>
          </Link>
        </Col>
      </Row>
      <Row
        style={{ display: "flex", justifyContent: "center", marginTop: "1vh" }}
      >
        <Col lg={6} md={6} sm={6}>
          <Link to="/register">
            <Button
              size="lg"
              variant="dark"
              style={{ width: "100%", fontWeight: "bold", fontSize: "3vh" }}
            >
              SignUp
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
