import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../actions/useractions";
import "../cssfile/Register.css";
import ErrorMessage from "../components/Error";
import Loading from "../components/Loading";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const preset_key = "disease_prediction";
  const cloud_name = "amankhanna";
  const postDetails = (pics) => {
    if (!pics) {
      setPicMessage(null);
      return;
    }
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const formData = new FormData();
      formData.append("file", pics);
      formData.append("upload_preset", preset_key);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        )
        .then((res) => {
          console.log("success");
          setPic(res.data.secure_url);
        })
        .catch((err) => {
          console.log("failure");
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/filldata");
    }
  }, [navigate, userInfo]);

  const [otp, setotp] = useState();
  const [beforeemail, setbefore] = useState("");
  const [timesend, settimesend] = useState();
  const [recievedotp, setrecievedotp] = useState();
  const [otpsuccess, setotpsuccess] = useState("");
  const [otperror, setotperror] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("password do not match");
      setotperror("");
      setotpsuccess("");
      return;
    }
    if (!recievedotp) {
      setotperror("Please first verigy OTP");
      setotpsuccess("");
      return;
    }
    if (recievedotp.toString() !== otp.toString()) {
      setotperror("OTP Does'nt match");
      setotpsuccess("");
      return;
    }
    if (email !== beforeemail) {
      setotperror("We have'nt send OTP to this E-mail");
      setotpsuccess("");
      return;
    }
    const time = Date.now() - timesend;
    if (time > 120000) {
      setotperror("Time Over");
      setotpsuccess("");
      return;
    } else {
      dispatch(register(name, email, password, pic));
      setotperror("");
      setotpsuccess("");
    }
  };

  const SendOTP = async (e) => {
    if (!email) {
      setotperror("Email not filled");
      setotpsuccess("");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/user/verify/otpregister",
        { email },
        config
      );
      setbefore(email);
      settimesend(Date.now());
      setrecievedotp(data.otp);
      setotperror("");
      setotpsuccess("OTP sended");
    } catch (err) {
      setotpsuccess("");
      setotperror(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };
  return (
    <>
      <Row className="profileContainer">
        <Col md={6}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                required
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                label="Upload Profile Picture"
                custom
              />
            </Form.Group>
            {otperror && (
              <ErrorMessage variant="danger">{otperror}</ErrorMessage>
            )}
            {otpsuccess && <ErrorMessage>{otpsuccess}</ErrorMessage>}
            <Form.Group controlId="formBasicPassword">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="password"
                value={otp}
                required
                placeholder="OTP"
                onChange={(e) => setotp(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              style={{ marginTop: "10px" }}
              onClick={SendOTP}
            >
              Send OTP
            </Button>

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              Register
            </Button>
          </Form>
          <div>
            Already have an account ?{" "}
            {
              <Link to="/login" className="login">
                SignIn
              </Link>
            }
          </div>
          <div>
            Forgot Password ?{" "}
            {
              <Link to="/forgot" className="forgot">
                Click Here !
              </Link>
            }
          </div>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={pic} alt={name} className="profilePic" />
        </Col>
      </Row>
    </>
  );
};

export default Register;
