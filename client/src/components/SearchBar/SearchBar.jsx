import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions/actions";
import style from './SearchBar.module.css'


const SearchBar = () => {
    const dispatch = useDispatch();
    // const errors = useSelector(state => state.error);

    const [ game, setGame ] = useState("")


    //console.log(game)

    const handleSubmit = (e) => {
        //console.log(e)
        e.preventDefault();
        dispatch(getVideogames(game));
        setGame("")
    }




    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    className={style.search} 
                    type="text"
                    placeholder="Busca un Videojuego Aquí"
                    value={game}
                    onChange={e => {
                        console.log(e.target.value)
                        return setGame(e.target.value)}}
                />
                <input 
                    type="submit"
                    value="Buscar"
                    className={style.button}
                />
            </form>
        </div>
    )
};


export default SearchBar;