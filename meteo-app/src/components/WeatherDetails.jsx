import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Button, Card, Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const WeatherDetails = () => {
  const { lat, lon } = useParams();
  const [weather, setWeather] = useState(null);
  const [nextDays, setNextDays] = useState(null);

  const fetchWeather = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=36f095b4b5b3e076ef5c536f51963530&units=metric&lang=en`
      );
      const data = await resp.json();
      setWeather(data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const fetchNextDays = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=36f095b4b5b3e076ef5c536f51963530&units=metric&lang=en`
      );
      const data = await resp.json();

      const dailyForecasts = data.list.filter((forecast) => forecast.dt_txt.includes("12:00:00")).slice(0, 5);
      setNextDays(dailyForecasts); //per ricevere 5 risultati con un orario fisso (senza mi dava errori vari)
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchNextDays();
  }, [lat, lon]);
  return (
    <Container className="justify-content-center text-center mt-5">
      {weather && (
        <>
          <Row>
            <Col xs={2} className="d-flex">
              <Link to={"/"}>
                <button type="button" class="btn btn-dark">
                  <i className="bi bi-arrow-left"></i>
                </button>
              </Link>
            </Col>
            <Col xs={8} className="text-center">
              <h3>
                {weather.name}, {weather.sys.country}
              </h3>
            </Col>
            <Col xs={2} className="d-flex">
              <button type="button" class="btn btn-dark d-none">
                Dark
              </button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="m-4 rounded-5">
                <Card.Body>
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
                  <h2 className="mt-0" style={{ fontSize: "90px" }}>
                    {Math.floor(weather.main.temp)}°C
                  </h2>
                  <h3 className="mt-3 text-capitalize">{weather.weather[0].description}</h3>
                  <h3 className="mt-3">
                    Today,{" "}
                    {new Date(weather.dt * 1000).toLocaleDateString("en-EN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Card className="small-cards">
                <i className="bi bi-wind ifs-xs ifs-sm ifs-md ifs-lg"></i>
                <p className="tfs-xs tfs-sm tfs-md tfs-lg mb-0">Wind Speed</p>
                <p className="tfs-xs tfs-sm tfs-md tfs-lg mb-0">{weather.wind.speed} km/h</p>
              </Card>
            </Col>
            <Col xs={4}>
              <Card className="small-cards">
                <i className="bi bi-arrows-collapse ifs-xs ifs-sm ifs-md ifs-lg"></i>
                <p className="tfs-xs tfs-sm tfs-md tfs-lg mb-0">Pressure</p>
                <p className="tfs-xs tfs-sm tfs-md tfs-lg mb-0">{weather.main.pressure} mb</p>
              </Card>
            </Col>
            <Col xs={4}>
              <Card className="small-cards">
                <i className="bi bi-moisture ifs-xs ifs-sm ifs-md ifs-lg"></i>
                <p className="tfs-xs tfs-sm tfs-md tfs-lg mb-0">Humidity</p>
                <p className="tfs-xs tfs-sm tfs-md tfs-lg mb-0">{weather.wind.speed}%</p>
              </Card>
            </Col>
          </Row>
        </>
      )}
      {nextDays && (
        <div className="mt-4">
          <h4 className="tfs-xs tfs-sm tfs-md tfs-lg mb-0">Next 5 Days</h4>
          <Row className="g-4">
            {nextDays.map((day, index) => (
              <Col xs={6} md={4} key={index}>
                <Card className="my-3 rounded-5 h-100 ">
                  <Card.Body>
                    <h5 className="tfs-xs tfs-sm tfs-md tfs-lg">
                      {new Date(day.dt_txt).toLocaleDateString("en-EN", { weekday: "short", day: "numeric", month: "short" })}
                    </h5>
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                    <p className="tfs-xs tfs-sm tfs-md tfs-lg mb-0"> {Math.floor(day.main.temp)}°C</p>
                    <p className=" text-capitalize tfs-xs tfs-sm tfs-md tfs-lg mb-0"> {day.weather[0].description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default WeatherDetails;
