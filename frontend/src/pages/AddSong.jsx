import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import fetchService from "../services/fetchService";
import useLocalState from "../services/useLocalStorage";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";

const AddSong = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  function addSong() {
    song.artistIds = artists;
    fetchService("http://localhost:8080/song", "post", jwt, song).then(
      (data) => (window.location.href = "/home")
    );
  }
  //for adding artists
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
      (data) => {
        setArtist({});
        handleClose();
        console.log(data);
      }
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
          <Button onClick={handleShow}> + Add Artist</Button>
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

      <Button className="mt-4" variant="primary" onClick={() => addSong()}>
        Save
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
          // className="mt-5 align-self-center"
          // style={{
          //   width: "40%",
          // }}
          >
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
                    onChange={(e) =>
                      updateArtist("dateOfBirth", e.target.value)
                    }
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
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addArtist()}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddSong;
