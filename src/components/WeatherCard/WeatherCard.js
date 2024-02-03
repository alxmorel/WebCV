import './WeatherCard.scss';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudShowersHeavy, faBolt, faTemperatureHigh, faWind } from '@fortawesome/free-solid-svg-icons';
import weatherService from '../../services/weather.service';
import AnimatedWeather from './AnimatedWeather/AnimatedWeather';

const WeatherCard = ({ location }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

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
        if (location) {
            fetchWeatherData();
        }
    }, [location]);

    return (
        <div className="weather_section">
            {/* <AnimatedWeather /> */}
            <div className="cloud_texture" />
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