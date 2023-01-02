import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import fetchService from "../services/fetchService";
import useLocalState from "../services/useLocalStorage";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";

const AddSong = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  let [artists, setArtists] = useState([]);
  const [song, setSong] = useState({
    songname: "",
    dateOfRelease: "",
  });
  let [options, setOptions] = useState([]);
  console.log(artists);
  useEffect(() => {
    fetchService("http://localhost:8080/artist", "get", jwt).then((data) => {
      options = [];
      data.map((obj) => {
        const option = {
          val: obj.artistId,
          key: obj.artistName,
        };
        options.push(option);
      });
      setOptions(options);
    });
  }, []);

  function updateSong(prop, value) {
    const newSong = { ...song };
    newSong[prop] = value;
    setSong(newSong);
  }

  function addArtist() {
    song.artistIds = artists;
    fetchService("http://localhost:8080/song", "post", jwt, song).then((data) =>
      console.log(data)
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
        <Col className="d-flex justify-content-between">
          <h1>Add Song</h1>
          <Button> + Add Artist</Button>
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
        <Col>
          <p>Select Artists</p>
          <Multiselect
            displayValue="key"
            onKeyPressFn={function noRefCheck() {}}
            onRemove={(event) => {
              artists = [];
              event.map((obj) => artists.push(obj.val));
              setArtists(artists);
            }}
            onSearch={function noRefCheck() {}}
            onSelect={(event) => {
              artists = [];
              event.map((obj) => artists.push(obj.val));
              setArtists(artists);
            }}
            options={options}
          />
        </Col>
      </Row>

      <Button className="mt-4" variant="primary" onClick={() => addArtist()}>
        Save
      </Button>
    </Container>
  );
};

export default AddSong;
