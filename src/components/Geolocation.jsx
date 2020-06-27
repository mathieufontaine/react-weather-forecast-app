import React, { useEffect } from 'react';
const API_KEY='36dc0a11010bf6f35af6d8551ab26296';
const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_weather = 'weather?';
const API_forecast = 'forecast?';

function Geolocation ({setWeather, setForecast}) {
    
    useEffect(() => {
        currentCoordinates();
      }, []);

    const fetchWeatherByCoordinates = (coordinates) => {
        fetch(`${API_URL}${API_weather}lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                console.log(data);
            });
            fetch(`${API_URL}${API_forecast}lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setForecast(data);
                console.log(data);
        });
    };
    
    
    const currentCoordinates = () => {
        if(navigator.geolocation) {
              const options = {timeout:60000};
              navigator.geolocation.getCurrentPosition((data) => {
                  fetchWeatherByCoordinates({lat: data.coords.latitude, lon: data.coords.longitude });
              });
           } else {
              alert("Sorry, your browser does not support geolocation!");
           }
    };


    // useEffect(() => {
    //     async function currentCoordinates();
    //     });

    return (
    <button className="geolocation" onClick={currentCoordinates}>Use Current Location</button>
    )
}

export default Geolocation;