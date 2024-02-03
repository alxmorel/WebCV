// services/weatherService.js
const GEOCODE_API_KEY = '65bde1fb74420969301626rtm01648f'; // Free - 1 Request/Second
//const BASE_URL = 'https://api.open-meteo.com/v1/forecast?latitude=43.297&longitude=5.3811&current=temperature_2m,precipitation,wind_speed_10m,wind_gusts_10m&forecast_days=1'; //Free
const BASE_URL = 'https://api.open-meteo.com/v1/forecast'; //Free
const OPTIONS_METEO = 'current=temperature_2m,cloud_cover,precipitation,wind_speed_10m,wind_gusts_10m&forecast_days=1'
const GEOCODE_BASE_URL = 'https://geocode.maps.co/search'
const weatherService = {
    getWeatherData: async (latitude, longitude) => {
        console.log("On récupère les données météo pour : ", latitude, ", ", longitude);
        try {
            //si pas de latitude en entrée on set Marseille par défaut
            if (latitude === "" && longitude === ""){
                latitude = "43.297"
                longitude = "5.3811"
            }
                const response = await fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&${OPTIONS_METEO}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données météo');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erreur:', error);
            throw error;
        }
    },
    getGeoLocation: async (city) => {
        try {
            console.log(' url demande:', `${GEOCODE_BASE_URL}?q=${city}&api_key=${GEOCODE_API_KEY}`);

            const response = await fetch(`${GEOCODE_BASE_URL}?q=${city}&api_key=${GEOCODE_API_KEY}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données météo');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erreur:', error);
            throw error;
        }
    },
};

export default weatherService;
