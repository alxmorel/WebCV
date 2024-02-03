import './WeatherCard.scss';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudShowersHeavy, faBolt, faTemperatureHigh, faWind } from '@fortawesome/free-solid-svg-icons';
import weatherService from '../../services/weather.service';
import AnimatedWeather from './AnimatedWeather/AnimatedWeather';

const WeatherCard = ({ location }) => {
    const [loading, setLoading] = useState(true);

    const [weatherData, setWeatherData] = useState(null);
    const [cloudCoverOpacity, setCloudCoverOpacity] = useState(0);
    const [cloudAnimationDuration, setCloudAnimationDuration] = useState(30);
    const [currentBackgroundColor, setCurrentBackgroundColor] = useState("rgb(77, 187, 187)");

    const cloud = (
        <div className="cloud" style={{ '--cloud-animation-duration': `${cloudAnimationDuration}s`, opacity: cloudCoverOpacity, }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-30 30 150 100">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgb(200,200,200)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgb(150,150,150)', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <ellipse cx="30" cy="70" rx="25" ry="20" fill="url(#grad1)" />
                <ellipse cx="60" cy="65" rx="30" ry="25" fill="url(#grad1)" />
                <ellipse cx="90" cy="70" rx="25" ry="20" fill="url(#grad1)" />
            </svg>
        </div>
    );

    const realisticBirds = [
        { type: 1, top: Math.random() * 10, left: Math.random() * 80 },
        { type: 2, top: Math.random() * 10, left: Math.random() * 80 },
        
    ].map((bird, index) => (
        <div
            key={`bird-realistic${index}`}
            className={`bird-realistic bird-realistic-${bird.type}`}
            style={{
                top: `${bird.top}vh`,
                left: `${bird.left}vw`,
                backgroundImage: `url('/webcv/img/icons/bird.png')`,
            }}
        />
    ));
    

    const getWeatherIcon = () => {
        if (!weatherData) return null;

        const precipitation = weatherData.current.precipitation;

        if (precipitation === 0) {
            return <FontAwesomeIcon icon={faSun} />;
        } else if (precipitation < 2) {
            return <FontAwesomeIcon icon={faCloudSun} />;
        } else if (precipitation < 5) {
            return <FontAwesomeIcon icon={faCloud} />;
        } else if (precipitation < 10) {
            return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
        } else {
            return <FontAwesomeIcon icon={faBolt} />;
        }
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const geoLocationData = await weatherService.getGeoLocation(location);

                if (geoLocationData && geoLocationData.length > 0) {
                    const latitude = geoLocationData[0].lat;
                    const longitude = geoLocationData[0].lon;

                    const weatherData = await weatherService.getWeatherData(latitude, longitude);
                    setWeatherData(weatherData);
                    updateWeatherData(weatherData);
                    setLoading(false);
                    console.log("Météo à " + location + " : ", weatherData);
                } else {
                    console.error('Aucune donnée de géolocalisation disponible.');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données météo:', error);
                setLoading(false);
            }
        };
        const getCurrentBackgroundColor = (weatherData) => {
            if (weatherData) {
                const now = new Date(weatherData.current.time);
                const sunrise = new Date(weatherData.daily.sunrise[0]);
                const sunset = new Date(weatherData.daily.sunset[0]);

                if (now.getHours() < (sunset.getHours() - 2) && now.getHours() > (sunrise.getHours() + 2)) {
                    return 'linear-gradient(rgb(135, 206, 235), rgb(77, 187, 187))';
                }


                if (now > sunrise && now < sunset) {
                    // Jour
                    return 'linear-gradient(to bottom, #87CEEB, #FFA500)';
                } else {
                    // Nuit
                    return 'linear-gradient(to bottom, #1A237E, #000000)';
                }
            }

        };
        const updateWeatherData = (weatherData) => {
            const windSpeed = weatherData?.current.wind_speed_10m || 0;
            setCloudCoverOpacity(weatherData?.current.cloud_cover / 100 || 0);

            const mapWindSpeedToDuration = (speed) => {
                return (150 - speed) * (30 - 3) / 150 + 3;
            };

            setCloudAnimationDuration(mapWindSpeedToDuration(windSpeed));
            setCurrentBackgroundColor(getCurrentBackgroundColor(weatherData));
        }

        if (location) {
            fetchWeatherData();
        }
    }, [location]);

    return (
        <div className="weather_section" style={{ background: currentBackgroundColor }}>
            {/* <AnimatedWeather /> */}
            <div className="cloud_texture" />
            {cloud}
            {cloud}
            {cloud}
            {cloud}
            {cloud}
            {cloud}
            {realisticBirds}

            <div className="sun" />
            <div className="weather_data">
                {loading ? (
                    <p>Chargement des données météo...</p>
                ) : (
                    <>

                        <div className='location_card'>
                            <div className='temperature'>
                                {weatherData?.current.temperature_2m} °C
                            </div>
                            <h2>{location}</h2>
                        </div>
                        <div className='weather_infos'>
                            <div className='precipitation'>
                                {getWeatherIcon()}  {weatherData?.current.precipitation} mm
                            </div>
                            <div className='vent'>
                                <FontAwesomeIcon icon={faWind} /> {weatherData?.current.wind_speed_10m} km/h
                            </div>
                            <div className='cloud_cover'>
                                <FontAwesomeIcon icon={faCloud} /> {weatherData?.current.cloud_cover}%
                            </div>
                        </div>


                    </>
                )}
            </div>
        </div>
    );
};

export default WeatherCard;