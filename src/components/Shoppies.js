import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const Shoppies = () => {
  const [movieDetails, setMovieDetails] = React.useState({ Search: [] });
  const [nominatedMovies, setNominatedMovies] = React.useState([]);

  function handleSubmitSearch(event) {
    event.preventDefault();
    let query = event.target.searchBar.value;
    query = query.replaceAll("'", "''");
    fetch(`http://www.omdbapi.com/?apikey=abaaeb92&s=${query}`)
      .then((response) => response.json())
      .then((data) => setMovieDetails(data));
  }

  function removeNomination(event) {
    let title = event.target.value;
    let newNominatedMovies = nominatedMovies.filter(
      (movie) => movie.Title !== title
    );
    setNominatedMovies(newNominatedMovies);
  }

  const itemList = movieDetails.Search.map((item, i) => {
    return (
      <Col
        className="border mb-4 mt-4"
        key={i}
        style={{
          fontFamily: "Georgia",
          backgroundColor: "black",
        }}
      >
        <h4 className="mt-4 mb-4" style={{ color: "#e3e3e3" }}>
          {`${item.Title}`}
          {", "}
          {`${item.Year}`}{" "}
          <Button
            variant="outline-dark text-dark"
            style={{ backgroundColor: "#FFD700" }}
            value={`${item.Title}`}
            onClick={(e) => nominateMovie(e)}
          >
            Nominate
          </Button>
        </h4>

        <img className="mb-4" src={`${item.Poster}`} alt=""></img>
      </Col>
    );
  });

  const nominateMovie = (e) => {
    let title = e.target.value;
    for (let i = 0; i < nominatedMovies.length; i++) {
      if (nominatedMovies[i].Title === title) {
        return false;
      }
    }

    let nominatedMovie = movieDetails.Search.filter(
      (item) => item.Title === title
    );
    let newNominatedMovies = [...nominatedMovies];
    newNominatedMovies.push(nominatedMovie[0]);
    setNominatedMovies(newNominatedMovies);
  };

  return (
    <Container
      className="sticky-top"
      style={{ backgroundColor: "#333333", height: "100%", minHeight: "100vh" }}
      fluid
    >
      <Row style={{ backgroundColor: "black" }}>
        <Col xs={2} md={2} className="align-self-end">
          <span
            style={{
              fontSize: "50px",
              fontFamily: "Brush Script MT",
              color: "#FFD700",
            }}
          >
            The Shoppies
          </span>
        </Col>
        <Col md={8} className="align-self-center mt-2">
          <Form onSubmit={handleSubmitSearch}>
            <Form.Row className="align-items-center">
              <Col lg="8" className="m-auto">
                <InputGroup>
                  <FormControl
                    placeholder="Enter a Movie Title"
                    name="searchBar"
                  />

                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary text-dark"
                      style={{ backgroundColor: "#FFD700" }}
                      type="submit"
                    >
                      Search
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <Container>
        <Row>
          <Col
            md={6}
            className="p-3 mt-5"
            style={{ color: "#FFD700", fontFamily: "Brush Script MT" }}
          >
            <h1>Search Results</h1>
            <Container className="p-5" fluid>
              <Row>{itemList}</Row>
            </Container>
          </Col>

          <Col
            md={6}
            className="p-3 mt-5"
            style={{ color: "#FFD700", fontFamily: "Brush Script MT" }}
          >
            <h1>Your Nominations</h1>
            <Container className="p-5 border" fluid>
              <Row>
                {nominatedMovies.map((movie, i) => {
                  return (
                    <Container>
                    <Row className="p-4"style={{ fontSize:"30px", fontFamily:"Georgia" }}key={i}>
                      {movie.Title}
                      <Button
                        variant="outline-dark text-dark ml-3"
                        style={{ backgroundColor: "#FFD700" }}
                        onClick={removeNomination}
                        value={movie.Title}
                      >
                        X
                      </Button>
                      
                    </Row>
                    </Container>
                  );
                })}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Shoppies;
