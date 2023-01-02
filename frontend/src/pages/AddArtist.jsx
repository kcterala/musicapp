import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import fetchService from "../services/fetchService";
import useLocalState from "../services/useLocalStorage";

const AddArtist = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [artist, setArtist] = useState({
    artistName: "",
    dateOfBirth: "",
    bio: "",
  });
  function updateArtist(prop, value) {
    const newArtist = { ...artist };
    newArtist[prop] = value;
    setArtist(newArtist);
  }

  function addArtist() {
    fetchService("http://localhost:8080/artist", "post", jwt, artist).then(
      (data) => console.log(data)
    );
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
          <h1>Add Artist</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Artist Name</Form.Label>
            <Form.Control
              value={artist.artistName}
              type="text"
              onChange={(e) => updateArtist("artistName", e.target.value)}
              placeholder="Enter username"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              value={artist.dateOfBirth}
              type="date"
              onChange={(e) => updateArtist("dateOfBirth", e.target.value)}
              placeholder="Date of Birth"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>About the artist</Form.Label>
            <Form.Control
              value={artist.bio}
              type="text"
              onChange={(e) => updateArtist("bio", e.target.value)}
              placeholder="Tell something"
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" onClick={() => addArtist()}>
        Save
      </Button>
    </Container>
  );
};

export default AddArtist;
