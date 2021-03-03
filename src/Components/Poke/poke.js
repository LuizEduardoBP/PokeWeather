import axios from 'axios'
import { useState, useEffect } from 'react'
import pokeApi from '../../Services/pokeApi'
import "./styles.scss"

export default function Poke(){
    const [search, setSearch] = useState(false)
    const [pokemon, setPokemon] = useState([])
    const [url, setUrl] = useState('')

    useEffect(()=>{
        async function getUrl(){
            try{
                const {data} = await pokeApi.get(`type/ice`)
                const dataPoke = data.pokemon
                const random = Math.floor(Math.random() * dataPoke.length) + 1 
                const poke = dataPoke[random]
                setUrl(poke.pokemon.url)
            }catch(error){
                console.error("Erro ao buscar dados", error)
            }
        }
        getUrl()        
    },[])


    useEffect(()=>{
        async function getPokemon(){
            try{
                const {data} = await axios.get(url)
                console.log(data)
                const search = {
                    name: data.name,
                    image: data.sprites.other.["official-artwork"].front_default || data.sprites.front_default,
                    type: data.types
                }
                setSearch(search)
            }catch(error){
                console.error("Erro ao buscar dados", error)
            }
        }
        getPokemon()        
    },[url])

    console.log(search)

    return(
        <div className="pokemon-container">
            {(search===false) ? "" :
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