import React, { useEffect, useState } from "react";
import { Container, Table, Row, Col, Navbar, Nav } from "react-bootstrap";
import Star from "../components/Star";
import fetchService from "../services/fetchService";
import useLocalState from "../services/useLocalStorage";

const HomePage = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    fetchService("http://localhost:8080/song/top", "get", jwt).then((data) =>
      setSongs(data)
    );
  }, []);
  return (
    <Container className="mt-5">
      <Navbar bg="primary" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Song Name</th>
                <th>Date of Release</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {songs &&
                songs.map((song) => (
                  <tr key={song.songId}>
                    <td>{song.songname}</td>
                    <td>{song.dateOfRelease}</td>
                    <td>
                      <Star></Star>
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
