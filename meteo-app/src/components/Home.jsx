import { useState } from "react";
import { Container, Form, Button, ListGroup, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [city, setCity] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const navigate = useNavigate();
  const fetchCities = async (e) => {
    console.log("fetch()");
    e.preventDefault();

    try {
      const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=36f095b4b5b3e076ef5c536f51963530
`);

      const data = await resp.json();
      setCitiesList(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Container className="text-center my-5">
      <h1>City Research</h1>
      <Form onSubmit={fetchCities}>
        <Form.Label htmlFor="inputCity"></Form.Label>
        <Form.Control type="text" id="inputCity" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City Name" required />
        <Button variant="secondary" type="submit" className="mt-4 tfs-xs tfs-sm tfs-md ">
          Search
        </Button>
      </Form>

      <ListGroup className="mt-4">
        <Row>
          {citiesList.map((city, index) => (
            <Col xs={6} className="g-4">
              <Card className="h-100">
                <ListGroup.Item key={index} style={{ cursor: "pointer" }} onClick={() => navigate(`/weatherdetails/${city.lat}/${city.lon}`)}>
                  <p className="tfs-xs tfs-sm tfs-md tfs-lg mb-0">
                    {city.name},{city.country}
                  </p>
                  <p className="tfs-xs tfs-sm tfs-md tfs-lg mb-0">{city.state}</p>
                </ListGroup.Item>
              </Card>
            </Col>
          ))}
        </Row>
      </ListGroup>
    </Container>
  );
};

export default Home;
