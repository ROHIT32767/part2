import React from "react"
import axios from 'axios'
const params = {
    KEY: process.env.REACT_APP_API_KEY
  };
export default function Single({ element }) {
    const [weather,setweather]=React.useState([{icon:"url",temp:0,speed:0}])
    React.useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${element.capitalInfo.latlng[0]}&lon=${element.capitalInfo.latlng[1]}&appid=${params.KEY}`,{params})
          .then(response => {
            const apiResponse = response.data;
            console.log(apiResponse)
            setweather({icon:apiResponse.weather[0].icon,temp:apiResponse.main.temp-273,speed:apiResponse.wind.speed})
          }).catch(error => {
            console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${element.capitalInfo.latlng[0]}&lon=${element.capitalInfo.latlng[1]}&appid=${params.KEY}`)
            console.log("Error in fetch",error);
        })
      },[element])
    console.log(weather)
    return (
        <div>
            <h2>{element.name.common}</h2>
            <h3> capital {element.capital[0]}</h3>
            <h4>area {element.area}</h4>
            <h5> Languages:</h5>
            <div>
                <ul>
                    {Object.values(element.languages).map(element => <li>{element}</li>)}
                </ul>
            </div>
            <img src={element.flags.png} alt="icons" />
            <h3> Weather in {element.capital[0]}</h3>
            <h4> Temperature {weather.temp} Celsius  </h4>
            <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icons"  />
            <h4> wind {weather.speed}m/s</h4>
        </div>
    )
}