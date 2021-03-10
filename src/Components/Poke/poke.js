import "./styles.scss"
import "../../themes.scss"
import { FaRegQuestionCircle } from "react-icons/fa"

export default function Poke({search, type}){
    
    return(
        <div className={`pokemon-container ${type}`}>
            {(search===false) ? <FaRegQuestionCircle/>:
            <>
                <h1>{search.name}</h1>
                <img src={search.image} alt=""/>
                {search.type.map((type => (
                    <h1>{type.type.name}</h1>
                )))}
            </>
                }
        </div>
    )
}