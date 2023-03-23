import React, { useState } from "react";
import Axios from "axios";
import Temp from "./Components/Temp"
import "./App.css";
import { useEffect } from "react";

export default function App(){
    const [city, setCity] = useState("");
    const [temp, setTemp] = useState({
        low_temp: "",
        visibility: "",
        pressure: "",
        humidity: "",
        wind: "",
        wind_direction: "",
        sunrise: "",
        sunset: "",
        country: "",
        city: "",
        desc: "",
        img: ""
    });
    useEffect(()=>{
        if(city !== ""){
            Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d25e86aa4c1dbaaf2a04d100ab7e483`)
            .then(response=> {
                setTemp(
                    prevTemp=>({
                        ...prevTemp,
                        low_temp: response.data.main.temp_min,
                        visibility: response.data.visibility,
                        pressure: response.data.main.pressure,
                        humidity: response.data.main.humidity,
                        wind: response.data.wind.speed,
                        wind_direction: response.data.wind.deg,
                        sunrise: response.data.sys.sunrise,
                        sunset: response.data.sys.sunset,
                        country: response.data.sys.country,
                        city: response.data.name,
                        desc: response.data.weather[0].description,
                        img: response.data.weather[0].icon
                })
                )
            })
            .catch(err=> console.log(err.message))
        }
    },[city]);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        setCity(e.target.cityName.value);
        e.target.cityName.value = "";
        e.target.countryName.value = "";
    }
    let date = new Date().toLocaleTimeString();
    let imgUrl = `https://openweathermap.org/img/wn/${temp.img}@2x.png`;
    let sunrise = String(temp.sunrise).slice(0,6);
    let sunset = String(temp.sunset).slice(0,6)

    return(
        <div className="container">
            <h1 className="heading">Weather App</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <input className="input-text" type="text" placeholder="Enter City" name="cityName"/>
                <input className="input-text" type="text" placeholder="Enter Country" name="countryName"/>
                <button type="submit">Submit</button>
             </form>
             <div className="temp-container">
                <div className="temp">
                    <h4 className="temp-head">{temp.city}, {temp.country}. Weather</h4>
                    <p className="temp-para">As of {date}</p>
                    <div className="actual-temp">
                        <h1 className="temp-celcius">{Math.round(temp.low_temp/10)}°</h1>
                        <div className="image-temp">
                            <img src= {imgUrl} alt="img" className="temp-img"/>
                            <p className="span-desc">{temp.desc}</p>
                        </div>
                    </div> 
                    <p>{temp.desc}</p>
                </div>
                <div className="temp-details">
                    <div className="sub-temp">
                        <Temp info={"High/Low"} value={Math.round(temp.low_temp/10)} units={""} />
                        <Temp info={"Humidity"} value={temp.humidity} units={"%"}/>
                        <Temp info={"Pressure"} value={temp.pressure} units={"hPa"}/>
                        <Temp info={"Visibility"} value={Math.round(temp.visibility/1000)} units={"Km"}/>
                    </div>
                    <div className="sub-temp">
                        <Temp info={"Wind"} value={temp.wind} units={"Km/Hr"} />
                        <Temp info={"Wind Direction"} value={temp.wind_direction} units={"° deg"}/>
                        <Temp info={"Sunrise"} value={sunrise} units={"AM"}/>
                        <Temp info={"Sunset"} value={sunset} units={"PM"}/>
                    </div>
                </div>
             </div>
        </div>
    )
};
