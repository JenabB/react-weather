import React from 'react';

const TopStatus = ({ weather }) => {
  return (
    <div className="weather-box">
      {(() => {
        if (weather.weather[0].main === 'Rain') {
          return <div className="weather-status">Hujan nih, dirumah aja</div>;
        } else if (weather.weather[0].main === 'Clouds') {
          return <div className="weather-status">Masih berawan kok</div>;
        } else if (weather.weather[0].main === 'Haze') {
          return (
            <div className="weather-status">
              Hati-hati kalo di luar, soalnya berkabut
            </div>
          );
        } else if (weather.weather[0].main === 'Clear') {
          return <div className="weather-status">Cerah ya langitnya</div>;
        }
      })()}
      <div className="temp">{Math.round(weather.main.temp)}°c</div>
    </div>
  );
};

export default TopStatus;
