import './App.css';
import React, {useState} from 'react';
import Weather from './components/weather';

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [city, setCity] = useState([]);
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  }

  // fetching weather api
  const getWeather = async() => {
    await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${city}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    navigator.geolocation.getCurrentPosition(function(position){
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  const getCurrentLocation = async()=>{
    
        console.log("Latitude is:",lat);
        console.log("Longitude is:",long);
  
        await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
          console.log(result);
        });
  } 
  return (
    <div className="App">
      <input type="text" placeholder="city" className='enterCity' value={city} onChange={handleInputChange}/>&nbsp;&nbsp;&nbsp;
      <button className='currentLocBtn'><img className='locationimg' alt='imagefile' src={require('./location.png')} onClick={getCurrentLocation}/></button>&nbsp;&nbsp;&nbsp;
      <button className='searchBtn' onClick={getWeather}>Search</button>
      {(typeof data.main!= 'undefined')?(
        <Weather weatherData={data}/>
      ):(<div></div>
      )}
    </div>
  );
}

export default App