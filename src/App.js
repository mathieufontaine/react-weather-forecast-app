import React, { useState, useEffect } from 'react';
import './assets/style/app.css';
import './assets/style/search.css';
import './assets/style/weather.css';
import './assets/style/forecast.css';
import './assets/style/webcams.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Forecast from './components/Forecast';
import Search from './components/Search';
import Weather from './components/Weather';
import Geolocation from './components/Geolocation';
import GetWebcams from './components/GetWebcams';




function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [forecast, setForecast] = useState([]);
  const [webcams, setWebcams] = useState([]);

  const updateBackground = (weather) => {
    const clouds = ["app clouds","app clouds1", "app clouds2","app clouds3","app clouds4", "app clouds5"];
    const rain = ["app rain","app rain1", "app rain2","app rain3","app rain4", "app rain5",
                "app rain6", "app rain7","app rain8","app rain9", "app rain10"];
    const clear = ["app clear","app clear1", "app clear2","app clear3"];
    const fog = ["app fog","app fog1"];
    const thunderstorm = ["app thunderstorm","app thunderstorm1", "app thunderstorm2"];
    switch (weather){
      case "Clouds": return clouds[Math.floor(Math.random()* clouds.length)] ;
      case "Clear": return clear[Math.floor(Math.random()* clear.length)] ;
      case "Rain": return rain[Math.floor(Math.random()* rain.length)];
      case "Fog": return fog[Math.floor(Math.random()* fog.length)];
      case "Snow": return "app snow";
      case 'Thunderstorm': return thunderstorm[Math.floor(Math.random()* thunderstorm.length)];
      default: return "app;"
    }
  }


  return (
    
    <div className = {typeof weather.main != "undefined" ? updateBackground(weather.weather[0].main) : "app" }>
      <main>
        <div className="search-box">
          <Search query={query} setQuery={setQuery} setWeather={setWeather} setForecast={setForecast}/>
          <Geolocation setWeather={setWeather} setForecast={setForecast}/>
        </div>


        {(typeof weather.main != "undefined") ? 
          <Weather weather={weather}/> : ('')
        }
        {(typeof weather.main != "undefined") ? 
          <GetWebcams weather={weather} webcams={webcams} setWebcams={setWebcams}/> : ('')
        }

        {( typeof forecast.list != "undefined" ) ? 
          <Forecast forecast={forecast} /> : 
          (weather !== '' ?
            (<div className="error-message">
              <h2>Sorry but we could not find any weather forecast.</h2>
              <h3>Please try again with another location</h3>
            </div>)
            : ('')
          )
        }
      </main>
    </div>

  );
}

export default App;
