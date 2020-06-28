import React from 'react';

const API_KEY_WEATHER = process.env.REACT_APP_API_KEY_WEATHER;
const API_URL = 'https://api.openweathermap.org/data/2.5/'
const API_weather = 'weather?';
const API_forecast = 'forecast?';


function Search( {query, setQuery, setWeather, setForecast} ){

    
    const search = (query) => {
        if (query !== ''){
        try {
            fetch(`${API_URL}${API_weather}q=${query}&units=metric&appid=${API_KEY_WEATHER}`)
                .then(response => response.json())
                .then(data => {
                    setWeather(data);
                    console.log(data);
                    // setQuery('');
                })
        } catch (err){
            console.log(err);
            }
           

            fetch(`${API_URL}${API_forecast}q=${query}&units=metric&appid=${API_KEY_WEATHER}`)
                .then(response => response.json())
                .then(data => {
                    setForecast(data);
                    console.log(data);
            });

        }
    }



return (

        <input type='text'
        className="search-bar"
        placeholder ="Search for a city"
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyUp={e => search(e.target.value)}
        />
)


}

export default Search;