import { useState } from "react"

// Define and export the WeatherForecast functional component.
export default function WeatherForecast(){

    // Initialize state using the useState hook to manage weather data within the component.
    // `weather` is the state variable holding the current weather data.
    // `setWeather` is the function to update the weather state when new data is received.
    const apiKey="25261dff92e64cb085fb78609059ba3e";
    const[weather, setWeather]= useState({
        icon: "https://openweathermap.org/img/wn/10d@2x.png",
        temp: "20",
        city: "Paris",
        humidity: "30",
        speed: "20"
    })

    function handleSubmit(event){
        event.preventDefault();

        let city=event.target.city.value

        if(!city){
            alert("Please provide city name")
            return
        }
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=metric&appid=" +apiKey)
        .then(response=>{
            if(!response.ok){
                throw new Error
            }    
            return response.json();
        })
        .then(data=> {
            setWeather({
                icon: "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png",
                temp: data.main.temp,
                city: data.name,
                humidity: data.main.humidity,
                speed: data.wind.speed
            })
        })
        .catch(error => {
            alert("Unable to fetch wetaher forecast")
        })

    }
    return (
        <div className="container my-5">
             {/* Styling div to center, add rounded borders, set text alignment to center, and text color to white */}
            <div className="mx-auto rounded border text-center text-white p-4" 
            style={{backgroundColor: "#3B5FAB", width: "400px"}}>
                <h2 className="fw-bold mb-5">Weather Forecast</h2>

                 {/* Form for city input with search functionality */}

                <form className="d-flex mb-3" onSubmit={handleSubmit}>
                    <input className="form-control me-2" placeholder="City" name="city"/>
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </form>

                {/* Static image to represent current weather, should be dynamically loaded based on actual data */}

                <img src={weather.icon} alt="..."/>

                <h1 className="display-4 fw-medium">{weather.temp}</h1>
                <h1 className="mb-5">{weather.city}</h1>

                <div className="row mb-3">
                    <div className="col">
                        {/* Column for humidity information */}
                        <i className="bi bi-water"></i> Humidity <br/>
                        {weather.humidity}%
                    </div>
                     {/* Column for Wind Speed information */}
                    <div className="col">
                        <i className="bi bi-wind"></i> WindSpeed <br/>
                        {weather.speed}km/h
                    </div>
                </div>

            </div>

        </div>
    )
}