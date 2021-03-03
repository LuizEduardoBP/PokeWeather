import "./styles.scss"
import {FaSearch} from "react-icons/fa"
import weatherApi from "../../Services/weatherApi"
import { useEffect, useState } from 'react'


export default function Weather(){
    const [input, setInput] = useState('')
    const [weather, setWeather] = useState(false)
    const [city, setCity] = useState('')

    useEffect(()=>{
        async function getWeatherByCity(){
            try{
                const {data} = await weatherApi.get(`weather?appid=2f246fbc49ab4d482f13847905a1b38e&q=${city}`)
                setWeather(data)
            }catch(error){
                console.error("Erro ao buscar dados", error)
            }
        }
        getWeatherByCity()        
    },[city])

    function handleSubmit(e){
        e.preventDefault()
        setCity(input)
    }

    if (weather !== false){
        var temperatura = Math.round(weather.main.temp - 273.15)
    }

    return(
        <div onSubmit={(e)=>handleSubmit(e)} className="weather-container">
            <form action="" className="form" >
                <input 
                type="text" 
                placeholder="Enter city name"
                onChange={(e)=>{setInput(e.target.value)}}
                value={input}/>
                <button><FaSearch/></button>
            </form>
            {weather === false 
                ?
                <div className="weather-data">
                    <h1>Search for a city by name</h1>    
                </div>
                :
                <div className="weather-data">
                    <h1>{weather.name}</h1>
                    <h1>{temperatura} C°</h1>
                    {weather.weather.map((weather)=>(
                        <h1 key={weather.id}>{weather.main}</h1>
                    ))}
                </div>
            }
        </div>  
    )
}