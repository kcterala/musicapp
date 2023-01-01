import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import fetchService from "../services/fetchService";
import useLocalState from "../services/useLocalStorage";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AddSong = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [artists, setArtists] = useState([]);
  const [song, setSong] = useState({
    songname: "",
    dateOfRelease: "",
    artistIds: [],
  });

  useEffect(() => {
    fetchService("http://localhost:8080/artist", "get", jwt).then((data) =>
      console.log(data)
    );
  }, []);

  function updateSong(prop, value) {
    const newSong = { ...song };
    newSong[prop] = value;
    setSong(newSong);
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
          <h1>Add Song</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Name of the Song</Form.Label>
            <Form.Control
              value={song.songname}
              type="text"
              onChange={(e) => updateSong("songname", e.target.value)}
              placeholder="Enter songname"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Date of Release</Form.Label>
            <Form.Control
              value={song.dateOfRelease}
              type="date"
              onChange={(e) => updateSong("dateOfRelease", e.target.value)}
              placeholder="Date of Release"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>

      <Button variant="primary" onClick={() => addArtist()}>
        Save
      </Button>
    </Container>
  );
};

export default AddSong;
