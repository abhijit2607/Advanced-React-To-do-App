import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/actions/weatherActions';

const WeatherForecast = () => {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();
    const { loading, weather, error } = useSelector((state) => state.weather);



    const handleFetchWeather = () => {
        if (city.trim() !== '') {
            dispatch(fetchWeather(city));
        }
    };

    const handleAutoLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(fetchWeather(`${latitude},${longitude}`));
                },
                () => {
                    dispatch(fetchWeather('India')); // Default fallback
                }
            );
        } else {
            dispatch(fetchWeather('India')); // Default fallback
        }
    }, [dispatch]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFetchWeather();
        }
    };

    useEffect(() => {
        handleAutoLocation();
    }, [handleAutoLocation]);

    return (
        <div className="p-4 bg-gradient-to-b from-green-200 to-green-50 bg-gray-50 rounded-md shadow-md w-full mx-auto max-w-7xl">
            <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 mx-auto">
                <h2 className="text-lg font-bold mb-4 text-center">Weather Forecast</h2>
                <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Enter city name to override"
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleFetchWeather}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                    >
                        Search
                    </button>
                </div>
                <button
                    onClick={handleAutoLocation}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4 w-full"
                >
                    Detect Location
                </button>
            </div>
            <div>
                {loading && <p className="text-center">Loading weather data...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {weather && weather.forecast && (
                    <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
                        {weather.forecast.forecastday.map((day) => (
                            <div key={day.date} className="bg-blue-100 p-4 rounded-md w-full md:w-1/3 lg:w-1/4">
                                <h3 className="text-lg font-semibold">{day.date}</h3>
                                <div className="flex items-center">
                                    <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-10 h-10 mr-4" />
                                    <div>
                                        <p>{day.day.condition.text}, {day.day.avgtemp_c}°C</p>
                                        <p>Max Temp: {day.day.maxtemp_c}°C</p>
                                        <p>Min Temp: {day.day.mintemp_c}°C</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherForecast;