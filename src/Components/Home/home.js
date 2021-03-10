import axios from 'axios'
import { useState, useEffect } from 'react'
import pokeApi from '../../Services/pokeApi'
import weatherApi from '../../Services/weatherApi'
import Poke from '../Poke/poke'
import Weather from '../Weather/weather'
import "./styles.scss"

export default function Home() {
    const [input, setInput] = useState('')
    const [weather, setWeather] = useState(false)
    const [city, setCity] = useState('')
    const [search, setSearch] = useState(false)
    const [url, setUrl] = useState('')
    const [type, setType] = useState("")

    useEffect(() => {
        async function getWeatherByCity() {
            try {
                const { data } = await weatherApi.get(`weather?appid=${process.env.REACT_APP_IDAPP}&q=${city}`)
                setWeather(data)
                const temperatura = Math.round(data.main.temp - 273.15)
                console.log(data)
                const wind = data.weather.map(wind=>wind.main)
                console.log(wind)
                if(wind[0] === "Rain"){
                    setType('electric')
                }else{
                    if (temperatura < 5) {
                        setType('ice')
                    } else if (temperatura >= 5 && temperatura < 10) {
                        setType('water')
                    } else if (temperatura > 12 && temperatura < 15) {
                        setType('grass')
                    } else if (temperatura > 15 && temperatura < 21) {
                        setType('ground')
                    } else if (temperatura > 23 && temperatura < 27) {
                        setType('bug')
                    } else if (temperatura > 27 && temperatura <= 33) {
                        setType('rock')
                    } else if (temperatura > 33) {
                        setType('fire')
                    } else {
                        setType('normal')
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar dados", error)
            }
        }
        getWeatherByCity()
    }, [city])

    useEffect(() => {
        async function getUrl() {
            try {
                const { data } = await pokeApi.get(`type/${type}`)
                const dataPoke = data.pokemon
                const random = Math.floor(Math.random() * dataPoke.length) + 1
                const poke = dataPoke[random]
                console.log(poke)
                setUrl(poke.pokemon.url)
            } catch (error) {
                console.error("Erro ao buscar dados", error)
            }
        }
        getUrl()
    }, [type])

    if (weather !== false) {
        var temperatura = Math.round(weather.main.temp - 273.15)
    }
    

    function handleSubmit(e) {
        e.preventDefault()
        setCity(input)
    }
    
    useEffect(() => {
        async function getPokemon() {
            try {
                const { data } = await axios.get(url)
                console.log(data)
                const search = {
                    name: data.name,
                    image: data.sprites.other.["official-artwork"].front_default || data.sprites.front_default,
                    type: data.types
                }
                setSearch(search)
            } catch (error) {
                console.error("Erro ao buscar dados", error)
            }
        }
        getPokemon()
    }, [url])

    return (
        <div className="app-container">
            <Weather
                weather={weather}
                city={city}
                temperatura={temperatura}
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                type={type}
            />
            <Poke 
            search={search}
            type={type} />
        </div>

    )
}