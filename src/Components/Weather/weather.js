import "./styles.scss"
import "../../themes.scss"
import {FaSearch} from "react-icons/fa"

export default function Weather({handleSubmit, input, setInput, weather, temperatura, type}){
    return(
        <div onSubmit={(e)=>handleSubmit(e)} className={`weather-container ${type}`}>
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