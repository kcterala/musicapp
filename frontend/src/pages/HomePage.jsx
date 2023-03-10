import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
} from "react-bootstrap";
import Star from "../components/Star";
import fetchService from "../services/fetchService";
import useLocalState from "../services/useLocalStorage";

const HomePage = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [songs, setSongs] = useState([]);
  console.log(songs);
  useEffect(() => {
    getTopSongs();
    getTopArtists();
    console.log("hello");
  }, []);

  function getTopSongs() {
    fetchService("http://localhost:8080/song/top", "get", jwt).then((data) => {
      console.log(data);
      setSongs(data);
    });
  }

  function rateTheSong(id, ratingValue) {
    const reqBody = {
      songId: id,
      ratingValue: ratingValue,
    };
    fetchService("http://localhost:8080/song/rate", "post", jwt, reqBody).then(
      (data) => {
        getTopSongs();
        getTopArtists();
      }
    );
  }

  //artists
  const [artists, setArtists] = useState([]);
  function getTopArtists() {
    fetchService("http://localhost:8080/artist/top", "get", jwt).then((data) =>
      setArtists(data)
    );
  }

  return (
    <Container className="mt-5">
      <Navbar bg="primary" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand href="#home">Watify</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Top Songs</Nav.Link>
            <Nav.Link href="#pricing">Top Artists</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Row>
        <Col>
          <div className="d-flex justify-content-between mb-3">
            <h1>Top Songs</h1>
            <Button
              onClick={() => {
                window.location.href = "/song";
              }}
              variant="primary"
            >
              {" "}
              +Add Song
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Song Name</th>
                <th>Date of Release</th>
                <th>Artist Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {songs &&
                songs.map((song) => (
                  <tr key={song.song.songId}>
                    <td>{song.song.songname}</td>
                    <td>{song.song.dateOfRelease}</td>
                    <td>
                      {song && (
                        <div className="d-flex justify-content-center">
                          {song.song.artists.map((artist) => (
                            <p
                              key={artist.artistId}
                              style={{ marginLeft: ".5rem" }}
                            >
                              {artist.artistName}
                              {","}
                            </p>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center">
                        <Star
                          id={song.song.songId}
                          value={song.currRating}
                          handleRating={rateTheSong}
                        ></Star>
                        <p style={{ color: "#fffff" }}>
                          ({song.song.avgRating})
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Top Artists */}
      <Row className="mt-5">
        <Col>
          <div className="d-flex justify-content-between mb-3">
            <h1>Top Artists</h1>
            <Button
              onClick={() => {
                window.location.href = "/song";
              }}
              variant="primary"
            >
              {" "}
              +Add Song
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Artist Name</th>
                <th>Date of Birth</th>
                <th>Songs</th>
              </tr>
            </thead>
            <tbody>
              {artists &&
                artists.map((artist) => (
                  <tr key={artist.name}>
                    <td>{artist.name}</td>
                    <td>{artist.dateOfBirth}</td>
                    <td>
                      {artist && (
                        <div className="d-flex justify-content-center">
                          {artist.songs.map((song) => (
                            <p
                              key={artist.artistId}
                              style={{ marginLeft: ".5rem" }}
                            >
                              {song}
                              {","}
                            </p>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
