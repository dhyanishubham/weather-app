import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import snow_icon from '../Assets/snow.png'
import drizzle_icon from '../Assets/drizzle.png'
import cloud_icon from '../Assets/cloud.png'
import clear_icon from '../Assets/clear.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
const WeatherApp = () => {


  
  let api_key="9a0b9b006da5fa174894bbd2d83093cc";

  const [wicon,setWicon]= useState(cloud_icon);


  const search= async ()=>{


    const element = document.getElementsByClassName("cityInput")
    if(element[0].value===""){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`

    let response=await fetch(url);
    if(response.status === 404){
      document.querySelector(".error").style.display="block";
      document.querySelector(".hero").style.display="none";
    } else{
    
      
    let data = await response.json();
    const humidity =document.getElementsByClassName("humidity-percent");
    const wind=document.getElementsByClassName("wind-rate")
    const temperature=document.getElementsByClassName("weather-temp")
    const location=document.getElementsByClassName("weather-location")
   

    humidity[0].innerHTML=data.main.humidity +"%";
    wind[0].innerHTML=Math.floor(data.wind.speed) +"km/hr";
    temperature[0].innerHTML=Math.floor(data.main.temp)+"°C";
    location[0].innerHTML=data.name;


    if(data.weather[0].icon==="01d"|| data.weather[0].icon==="01n")
    {
      setWicon(clear_icon);
    }
    else if (data.weather[0].icon==="02d"|| data.weather[0].icon==="02n" )
    {
      setWicon(cloud_icon);
    }
    else if (data.weather[0].icon==="03d"|| data.weather[0].icon==="03n" )
    {
      setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon==="04d"|| data.weather[0].icon==="04n" )
    {
      setWicon(drizzle_icon);
    } 
    else if (data.weather[0].icon==="09d"|| data.weather[0].icon==="09n" )
    {
      setWicon(cloud_icon);
    } 
    else if (data.weather[0].icon==="10d"|| data.weather[0].icon==="10n" )
    {
      setWicon(cloud_icon);
    } 
    else if (data.weather[0].icon==="13d"|| data.weather[0].icon==="13n" )
    {
      setWicon(snow_icon);
    } 
    else 
    {
      setWicon(clear_icon);
    }

    document.querySelector(".hero").style.display="block";
    document.querySelector(".error").style.display="none";

    
    }



  }



  return (
    <div className="body-container">
    <div className='container'>
      <div className="top-bar">
        <input type="text" className='cityInput' placeholder='Enter city name'/>
        <div className='search-icon' onClick={()=>{search()}}>
          <img src={search_icon} alt="search_icon" />
        </div>

      </div>
     <div className="error">
      <p>Invalid City Name</p>
     </div>
     <div className="hero" onClick={()=>{search()}} >
     
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">34°C</div>
      <div className="weather-location">Bihar</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className='icon'/>
          <div className="data">
            <div className="humidity-percent">67%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className='icon'/>
          <div className="data">
            <div className="wind-rate">18 km/hr</div>
            <div className="text">Wind-Speed</div>
          </div>
        </div>

      </div>
      </div>
    </div>
    </div>
  )
}

export default WeatherApp
