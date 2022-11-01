import React, { useState } from 'react';
import '../css/App.css';
import Header from './Header';
import Main from './Main';

let API_KEY: string | null = null

if (!API_KEY) {
  API_KEY = prompt("Отсутствует API-key, введите ключ")
}

function App() {

  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);
  let [userCity, setUserCity] = useState("");
  let [weather, setWeather] = useState({});

  // Get coords from browser
  function getCoords()  {
    navigator.geolocation.getCurrentPosition((el) => {
      setLatitude(latitude = el.coords.latitude);
      setLongitude(longitude = el.coords.longitude);
      getCityCoord(latitude, longitude)
    });
  };

  // if coords is empty, try get coords from browser
  if (!latitude && !longitude) {
    getCoords();
  }

  // Get city name from OpenWeather API
  function getCityCoord(lat : number, long : number) {
      fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`)
          .then(res => res.json())
          .then(data => {
          setUserCity(userCity = data[0].local_names.ru);
          getWeather(latitude, longitude)
      });      
    }
  
  // Get city coords from OpenWeather API with city name
  function setCity(city : string) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
          .then(res => res.json())
          .then(data => {
            setUserCity(data[0].local_names.ru);
            setLatitude(latitude = data[0].lat);
            setLongitude(longitude = data[0].lon);
            getWeather(latitude, longitude)
          })
          .catch(e => {
            setUserCity(`Ошибка при определении города`);
            setLatitude(latitude = 0);
            setLongitude(longitude = 0)
          })
          ;
    }

  // Get weather from OpenWeather API
  function getWeather(lat : number, long : number) {
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric&lang=ru`)
        .then(res => res.json())
        .then(data => {
          setWeather(weather = data)
        });
        
  }


  return (
    <div className="App">
      <Header userCity={userCity} onClickGetCity={setCity}/>
      {(weather.hasOwnProperty("current")) && <Main userCity={userCity} latitude={latitude} longitude={longitude} weather={weather}/>}
    </div>
  );
}

export default App;
