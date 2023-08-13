import React, {useEffect, useState} from 'react';
import './styles.css';
import {Card} from 'semantic-ui-react';
import moment from 'moment';
import mist from '../assets/image/mist.jpg';
import rain from '../assets/image/rain1.jpg';
import clear from '../assets/image/clear.jpg';
import clouds from '../assets/image/clouds.jpg';
import haze from '../assets/image/haze.jpg';
import dust from '../assets/image/dust.jpg';
// import axios from 'axios';


const Weather = ({weatherData})=>{
    const [backgroundImage, setbbackgroundImage] = useState('');
    var data = weatherData.weather[0].main;
    useEffect(()=>{
        const weatherCondition = data.toLowerCase();
        const backgroundUrl = getBackgroundImageByWeatherCondition(weatherCondition);
        setbbackgroundImage(backgroundUrl);
        console.log(backgroundUrl);
        console.log(weatherCondition);
    },[data,backgroundImage]);

    const getBackgroundImageByWeatherCondition = (condition) => {
        // Define your own mapping of weather conditions to background images
        const conditionToBackgroundMap = {
          'clear': clear,
          'clouds': clouds,
          'rain': rain,
          'haze': haze,
          'mist': mist,
          'dust':dust
          // Add more mappings for different weather conditions
        };
    
        return conditionToBackgroundMap[condition] || '';
      };

    return(
    <Card>
    <Card.Content>
      <div className="main" style={{ backgroundImage: `url(${backgroundImage})`}}>
            <p className="header">{weatherData.name}</p>
            
            <div className="flex">
                <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
                <p className="description">{weatherData.weather[0].main}</p>
            </div>

            <div className="flex">
                <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
                <p className="temp">Humidity: {weatherData.main.humidity} %</p>
            </div>

            <div className="flex">
                <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>
        </div>
       </Card.Content>
    </Card>
    )
}

export default Weather