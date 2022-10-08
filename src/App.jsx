import { useState } from 'react';
import './App.css';
import coldImg from './assets/cold-bg.jpg';
import warmImg from './assets/warm-bg.jpg';
import dotenv from 'dotenv';
import path from 'path';
import styled, { keyframes } from 'styled-components';

//création d'un loader
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
    transform: rotate(360deg);
    }
`;

const Loader = styled.div`
  margin: 0 auto;
  padding: 10px;
  border: 6px solid #fff;
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`;

/*Création d'un objet avec les information utiles relative à l'API */
const api = {
  key: `${import.meta.env.VITE_WEATHER_API_KEY}`, // import de la clé stockée dans la variable d'environnement du fichier .env
  baseUrl: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [userInput, setUserInput] = useState('');
  const [weather, setWeather] = useState({});
  const [isDataLoading, setDataLoading] = useState(false);

  // Requête API lorsque l'utilisateur saisit  une ville
  const search = (event) => {
    if (event.key === 'Enter') {
      setDataLoading(true); // tant que les informations n'ont pas été récupérées, le state du loader est sur true
      fetch(
        `${api.baseUrl}weather?q=${userInput}&units=metric&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
          setUserInput('');
          setDataLoading(false);
        });
    }
  };

  //Récupération et formatage de la date d'aujourd'hui
  const dateBuilder = () => {
    let date = String(new window.Date());
    date = date.slice(0, 15);
    date = date.split(' ');
    date = [date[0], date[2], date[1], date[3]];
    date = date.join();
    date = date.replaceAll(',', ' ');
    date = date.replaceAll('Mon', 'Lun');
    date = date.replaceAll('Tue', 'Mar');
    date = date.replaceAll('Wed', 'Mer');
    date = date.replaceAll('Thu', 'Jeu');
    date = date.replaceAll('Fri', 'Ven');
    date = date.replaceAll('Sat', 'Sam');
    date = date.replaceAll('Sun', 'Dim');
    return date;
  };

  return (
    <div className="App">
      <img
        className="backgroundImg"
        src={
          weather.main === undefined
            ? warmImg
            : weather.weather[0].main === 'Clouds'
            ? 'https://images.pexels.com/photos/3941855/pexels-photo-3941855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            : weather.weather[0].main === 'Rain'
            ? 'https://images.pexels.com/photos/8589272/pexels-photo-8589272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            : weather.weather[0].main === 'Mist'
            ? 'https://images.pexels.com/photos/2582768/pexels-photo-2582768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            : weather.weather[0].main === 'Smoke'
            ? 'https://images.pexels.com/photos/7240659/pexels-photo-7240659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            : weather.weather[0].main === 'Haze'
            ? 'https://images.pexels.com/photos/7240659/pexels-photo-7240659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            : weather.weather[0].main === 'Fog'
            ? 'https://images.pexels.com/photos/939807/pexels-photo-939807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            : weather.weather[0].main === 'Snow'
            ? 'https://images.pexels.com/photos/3623207/pexels-photo-3623207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            : weather.weather[0].main === 'Clear' &&
              'https://images.pexels.com/photos/6858608/pexels-photo-6858608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        alt="arrière plan hiver"
      />
      <main>
        <div className="searchBox">
          <input
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            className="searchBar"
            placeholder="Entrez une ville..."
            value={userInput}
            onKeyDown={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            {isDataLoading === false ? ( // le loader s'affiche en attendant les données
              <>
                <div className="location-box">
                  <div className="location">
                    {weather.name} , {weather.sys.country}
                  </div>
                  <div className="date">{dateBuilder()}</div>
                </div>
                <div className="weatherbox">
                  <div className="temp">{Math.round(weather.main.temp)}°c</div>
                  <div className="weather">
                    {weather.weather[0].main === 'Clouds'
                      ? 'Nuageux'
                      : weather.weather[0].main === 'Clear'
                      ? 'Ensoleillé'
                      : weather.weather[0].main === 'Mist'
                      ? 'Brumeux'
                      : weather.weather[0].main === 'Haze'
                      ? 'Brouillard Urbain'
                      : weather.weather[0].main === 'Smoke'
                      ? 'Brouillard'
                      : weather.weather[0].main === 'Snow'
                      ? 'Enneigé'
                      : weather.weather[0].main === 'Rain'
                      ? 'Pluvieux'
                      : weather.weather[0].main}
                  </div>
                </div>{' '}
              </>
            ) : (
              <Loader />
            )}
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
