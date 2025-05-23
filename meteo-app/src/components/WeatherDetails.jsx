import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Button, Card, Col } from "react-bootstrap";

const WeatherDetails = () => {
  const { lat, lon } = useParams();
  const [weather, setWeather] = useState(null);
  const [nextDays, setNextDays] = useState(null);

  const fetchWeather = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=36f095b4b5b3e076ef5c536f51963530&units=metric&lang=it`
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
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=36f095b4b5b3e076ef5c536f51963530&units=metric&lang=it`
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
        <Col xs={12}>
          <Card>
            <div className="mt-3">
              <h3>
                {weather.name}, {weather.sys.country}
              </h3>
              <h3 className="mt-5">{weather.weather[0].description}</h3>

              <h2 className="mt-5">Temperatura: {weather.main.temp}°C</h2>
            </div>
          </Card>
        </Col>
      )}
      {nextDays && (
        <div className="mt-4">
          <h4>Previsioni per i prossimi 5 giorni</h4>
          {nextDays.map((day, index) => (
            <Card key={index} className="my-3">
              <Card.Body>
                <h5>{new Date(day.dt_txt).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</h5>
                <p>Temperatura: {day.main.temp}°C</p>
                <p>Condizioni: {day.weather[0].description}</p>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default WeatherDetails;
