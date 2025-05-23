import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";

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
      const resp = await fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=36f095b4b5b3e076ef5c536f51963530`);
      const data = await resp.json();
      setNextDays(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchNextDays();
  }, [lat, lon]);
  return (
    <Container>
      {weather && (
        <div className="mt-3">
          <h3>Meteo di {weather.name}</h3>

          <p>Temperatura: {weather.main.temp}</p>
        </div>
      )}
      {nextDays && (
        <div className="mt-4">
          <h4>Previsioni per i prossimi 5 giorni</h4>
          {/* {nextDays.map(([]) => (
          
          ))} */}
        </div>
      )}
    </Container>
  );
};

export default WeatherDetails;
