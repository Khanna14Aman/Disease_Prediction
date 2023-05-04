import React, { useEffect, useState } from "react";
import "../cssfile/SelectValuse.css";
import { Col, Container, Row } from "react-bootstrap";

const SelectValues = ({ name, objectValues, setValues }) => {
  return (
    <Container fluid>
      <Row>
        <Col lg={2} md={2} sm={0}></Col>
        <Col
          lg={8}
          md={8}
          sm={12}
          className="outerdiv"
          style={{ overflowWrap: "anywhere" }}
        >
          <div style={{ fontWeight: "bold" }}>{name}</div>
          <div>
            <select
              onChange={(e) =>
                setValues((previousValues) => {
                  return { ...previousValues, [name]: e.target.value };
                })
              }
            >
              {objectValues[name] == 0 && (
                <>
                  <option value="0">NO</option>
                  <option value="1">YES</option>
                </>
              )}
              {objectValues[name] == 1 && (
                <>
                  <option value="1">YES</option>
                  <option value="0">NO</option>
                </>
              )}
            </select>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectValues;
