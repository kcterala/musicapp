import React, { useState } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import fetchService from "../services/fetchService";
import useLocalState from "../services/useLocalStorage";

const LoginPage = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // console.log(username);
  // console.log(password);

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };
    console.log(reqBody);

    fetch("http://localhost:8080/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
      method: "post",
    })
      .then((res) => Promise.all([res.json(), res.headers]))
      .then(([body, data]) => {
        const token = data.get("authorization");
        setJwt(token);
        window.location.href = "/home";
      });
  }
  return (
    <Container
      className="mt-5 align-self-center"
      style={{
        width: "40%",
      }}
    >
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              id="username"
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button
            variant="primary"
            type="submit"
            onClick={() => sendLoginRequest()}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
