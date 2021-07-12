import { useState, useEffect } from 'react';
import Top from './components/TopStatus';
import { properties } from './Properties';
import './App.css';
const api = {
  key: '3e7d51461c99408ff6f959ee54750877',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);
  const [forecasts, setForecasts] = useState([]);

  const search = (e) => {
    if (e.key === 'Enter') {
      try {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            localStorage.setItem('weather', JSON.stringify(result));
          })
          .catch((error) => console.log(error.response));
        fetch(`${api.base}forecast?q=${query}&appid=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            setQuery('');
            const forecasts = result.list.filter(
              (_, index) => index % 15 === 0
            );
            setForecasts(forecasts);
            localStorage.setItem('forecasts', JSON.stringify(forecasts));
          })
          .catch((error) => console.log(error.response));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const jsonWeather = JSON.parse(localStorage.getItem('weather'));
    jsonWeather && setWeather(jsonWeather);
    const jsonForecasts = JSON.parse(localStorage.getItem('forecasts'));
    jsonForecasts && setForecasts(jsonForecasts);
  }, []);

  const dateBuilder = (d) => {
    let months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'Nopember',
      'Desember',
    ];
    let days = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      "Jum'at",
      'Sabtu',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main !== 'undefined'
          ? weather.weather[0].main === 'Rain'
            ? 'app rain'
            : weather.weather[0].main === 'Clouds'
            ? 'app cloud'
            : weather.weather[0].main === 'Snow'
            ? 'app snow'
            : weather.weather[0].main === 'Clear'
            ? 'app clear'
            : weather.weather[0].main === 'Haze'
            ? 'app haze'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== 'undefined' ? (
          <div>
            <Top weather={weather} />

            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="container forecast">
                {forecasts.map((w, index) => (
                  <div key={index}>
                    <div className="forecast-container">
                      <h1>{Math.round(weather.main.temp)}°c</h1>

                      <img
                        src={`${properties.weatherIconUrl}/${w.weather[0].icon}@2x.png`}
                        alt="weather-icon"
                      ></img>
                      <h1>{w.weather[0].main}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h1 style={{ color: 'white', fontWeight: 'bold' }}>
            Masukkan nama kota
          </h1>
        )}
      </main>
    </div>
  );
}

export default Weather;
