import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/Error";
import Loading from "../components/Loading";
import { updateProfile } from "../actions/useractions";
import "../cssfile/Profile.css";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
      // console.log(userIn fo.pic);
    }
  }, [navigate, userInfo]);
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
      console.log("1");
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password and Confirm password should be same");
    } else {
      setMessage("");
      dispatch(updateProfile({ name, email, password, pic }));
    }
  };
  return (
    <>
      <Row className="profileContainer">
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            {loading && <Loading />}
            {success && !message && (
              <ErrorMessage variant="success">
                Updated Successfully
              </ErrorMessage>
            )}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>{" "}
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId="pic" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                label="Upload Profile Picture"
                custom
              />
            </Form.Group>
            <Button type="submit" varient="primary">
              Update
            </Button>
          </Form>
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
      <Link to="/filldata">Go For CheckUP</Link>
    </>
  );
};

export default Profile;
