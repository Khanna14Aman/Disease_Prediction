import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../cssfile/Login.css";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/Error";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/useractions";
import { Col, Container, Row } from "react-bootstrap";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/filldata");
    }
  }, [navigate, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <Container fluid className="login-container">
        <div className="login-header">
          Welcome to Login Page of Disease Prediction
        </div>
      </Container>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div className="outer-divv1">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Container style={{ position: "absolute", bottom: "2vh" }}>
          <Row>
            <Col>
              Don't have account ?{" "}
              <Link to="/register" className="signup">
                SighUp
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              Forgot Password ?{" "}
              <Link to="/forgot" className="forgot">
                Click Here !
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
