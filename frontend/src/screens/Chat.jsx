import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../components/Error";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import "../cssfile/ScrollBar.css";
import Loading from "../components/Loading";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import io from "socket.io-client";
import Header from "../components/Header";
var socket, selectedChatCompare;

const Chat = () => {
  const [doSort, setDoSort] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const widthMatch = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate();
  const [socketConnected, setSocketConnected] = useState(false);

  // Is user LoggedIn?

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  // For fetching all users

  const [AllUser, setAllUser] = useState([]);
  const [error, setError] = useState(false);
  const GetAllUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      var { data } = await axios.get(`/user/getalluser?search=`, config);
      setAllUser(data);
      setAllUser((AllUser) =>
        AllUser.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() === b.name.toLowerCase()) {
            return 0;
          }
        })
      );
      setDoSort(!doSort);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    GetAllUser();
  }, []);

  // sorting user according to ascesding order of chat with them
  const [view, setView] = useState({});
  const selectUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      var { data } = await axios.get("/chat", config);
      const arr = Array();
      for (var value of data) {
        for (var val of value.users) {
          if (val._id !== userInfo._id) {
            arr.push(val);
          }
        }
      }
      var v = {};
      for (var value of data) {
        var key;
        var valu;
        for (var val of value.pendingView) {
          if (val.user.toString() !== userInfo._id.toString()) {
            key = val.user.toString();
          } else {
            valu = val.value;
          }
        }
        if (valu > 0) {
          v[key] = valu;
        }
      }
      setView(v);
      var allIds = Array();
      for (var value of arr) {
        allIds.push(value._id.toString());
      }
      var rest = Array();
      rest = AllUser.filter((value) => {
        return !allIds.includes(value._id.toString());
      });

      var UserOrder = Array();
      for (var value of arr) {
        UserOrder.push(value);
      }
      for (var value of rest) {
        UserOrder.push(value);
      }

      setAllUser(UserOrder);
      setError(false);
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (AllUser.length > 0) {
      selectUser();
    }
  }, [doSort]);

  // for sending message..

  const [messagevalue, setmessagevalue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messagevalue) {
      return;
    }
    try {
      const chatId = selectedChat._id;
      const content = messagevalue;
      setmessagevalue("");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/message",
        { chatId, content },
        config
      );
      socket.emit("new message", data);
      setAllMessage([...allmessage, data]);
      // getallmessage(chatId);
      setDoSort(!doSort);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  // For fetching all message with particular user when any user get selected or any message sended
  const [loading, setLoading] = useState(false);

  const [allmessage, setAllMessage] = useState([]);
  const getallmessage = async (chatId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/message/${chatId}`, config);
      setLoading(false);
      setAllMessage(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  // for accessing or creating first time chat with particular user;

  const [selectedChat, setSelectChat] = useState();
  const AccessChat = async (userId) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/chat", { userId }, config);
      setSelectChat(data);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      getallmessage(selectedChat._id);
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  // Logic to move to scroll at bottom automatically when new message send or recieve
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
    if (selectedChat) {
      setZero(selectedChat._id);
    }
  }, [allmessage]);

  // connecting socket to backend

  useEffect(() => {
    socket = io("http://localhost:8000");
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  // set pending views to zero for particular chat id.

  const setZero = async (chatId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put("/chat/setZero", { chatId }, config);
      console.log("done");

      // when we see message and set pending view to 0 now fetch again
      selectUser();
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  // What to do when user recieved any message from any user.

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setDoSort(!doSort);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // nothing
      } else {
        setAllMessage([...allmessage, newMessageRecieved]);
        // getallmessage(newMessageRecieved.chat._id);
      }
    });
  });

  return (
    <>
      <Header setSearchValue={setSearchValue} />
      <Container fluid>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Row>
          {(widthMatch || !selectedChat) && (
            <Col
              lg={3}
              md={3}
              style={{
                height: "90vh",
                backgroundColor: "wheat",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {AllUser &&
                AllUser.filter((user) =>
                  user.name.toLowerCase().includes(searchValue.toLowerCase())
                ).map((value) => (
                  <Row
                    className="selectuser"
                    onClick={() => AccessChat(value._id)}
                    md={2}
                    lg={2}
                    sm={2}
                    key={value._id}
                    style={{
                      minHeight: "10vh",
                      marginBottom: "1vh",
                      backgroundColor: "gray",
                    }}
                  >
                    <Col
                      md={2}
                      lg={2}
                      sm={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Image
                        src={value.pic}
                        style={{ height: "5vh", width: "5vh" }}
                        roundedCircle
                      ></Image>
                    </Col>
                    <Col>
                      <Row md={1} lg={1} sm={1} style={{ paddingTop: "1vh" }}>
                        <Col>
                          <strong>
                            {value.name}
                            {view && view[value._id.toString()] && (
                              <span
                                style={{
                                  marginLeft: "1px",
                                  color: "lightgreen",
                                }}
                              >
                                {view[value._id.toString()]}
                              </span>
                            )}
                          </strong>
                        </Col>
                        <Col>{value.email}</Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
            </Col>
          )}

          {(widthMatch || selectedChat) && (
            <Col
              style={{
                height: "90vh",
                backgroundColor: "yellow",
                paddingRight: "0vw",
                paddingLeft: "0vw",
              }}
            >
              {loading && (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loading />
                </div>
              )}
              {selectedChat ? (
                <>
                  <Container
                    fluid
                    style={{
                      backgroundColor: "gainsboro",
                      height: "5vh",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <ArrowBackIcon
                      className="arrow"
                      onClick={() => setSelectChat()}
                    />
                    <strong>
                      {selectedChat.users[0]._id === userInfo._id
                        ? selectedChat.users[1].name
                        : selectedChat.users[0].name}
                    </strong>
                    {/* <VisibilityIcon className="view" /> */}
                  </Container>
                  <Container
                    fluid
                    style={{
                      height: "75vh",
                      overflowY: "scroll",
                    }}
                  >
                    {allmessage.length === 0 && (
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "5vh",
                        }}
                      >
                        <strong>No Chats...</strong>
                      </div>
                    )}
                    {allmessage.length > 0 &&
                      allmessage.map((message) => (
                        <Row
                          key={message._id}
                          style={{
                            paddingLeft: "1vw",
                            paddingRight: "1vw",
                            display: "flex",
                            justifyContent:
                              userInfo._id === message.sender._id
                                ? "right"
                                : "left",
                          }}
                        >
                          <div
                            style={{
                              width: "auto",
                              maxWidth: "50%",
                              overflowWrap: "anywhere",
                              color: "black",
                              backgroundColor:
                                userInfo._id === message.sender._id
                                  ? "red"
                                  : "pink",

                              marginTop: "1vh",
                              padding: "1vh",
                              borderRadius: "10px",
                            }}
                          >
                            <strong>{message.content}</strong>
                          </div>
                        </Row>
                      ))}
                    <div ref={bottomRef} />
                  </Container>
                  <div
                    className="form-div"
                    style={{
                      paddingLeft: "1vw",
                      position: "fixed",
                      width: widthMatch ? "80vw" : "100%",
                      bottom: "1vh",
                    }}
                  >
                    <Form onSubmit={sendMessage}>
                      <div style={{ width: "80%", display: "inline-block" }}>
                        <Form.Group controlId="formBasicText">
                          <Form.Control
                            type="text"
                            value={messagevalue}
                            placeholder="Enter message to send..."
                            onChange={(e) => setmessagevalue(e.target.value)}
                            autoComplete="off"
                          />
                        </Form.Group>
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                          marginLeft: "1vh",
                        }}
                      >
                        <Button
                          variant="success"
                          style={{ borderRadius: "50%" }}
                          type="submit"
                        >
                          <SendIcon />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </>
              ) : (
                !loading && (
                  <Container
                    style={{
                      height: "100%",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "5vh",
                      justifyContent: "center",
                    }}
                  >
                    <strong>Select User to Chat with them...</strong>
                  </Container>
                )
              )}
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Chat;
