import Poke from '../Poke/poke'
import Weather from '../Weather/weather'
import "./styles.scss"

export default function Home(){
    return(
        <div className="app-container">
            <Weather/>
            <Poke/>
        </div>
        
    )
}