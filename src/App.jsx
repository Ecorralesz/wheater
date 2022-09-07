import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [location, setLocation] = useState({});
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=4b45369546b463b9215d747d9d34ff82`)
      .then((res) => {
        res.data.main.temp = res.data.main.temp - 273.15;
        setLocation(res.data)});
    }

    console.log(location)

  }, []);

  return (
    <div className="App">
      <div className="Card">
      <h1>Wheather App</h1>
      <h2>{location.sys?.country}, {location.name}</h2>  
      <div className="CardGrid">
      <div>
      <img src={`http://openweathermap.org/img/wn/${location.weather?.[0].icon}.png`} alt="" />
      <h3>Temp: {isFahrenheit ? location.main?.temp * 1.8 + 32 : location.main?.temp} {isFahrenheit ? '°C' : '°F'}</h3>
      <button onClick={() => setIsFahrenheit(!isFahrenheit)}>
        Change To {isFahrenheit ? 'Fahrenheit' : 'Celcius'}
      </button>
      </div>
      <div>
      <h4 >Description: {location.weather?.[0].description}</h4> 
      <h4>Humidity: {location.main?.humidity}</h4>
      <h4>Pressure: {location.main?.pressure}</h4>
      </div>
      </div>

      </div>
    </div>
  );
}

export default App;
