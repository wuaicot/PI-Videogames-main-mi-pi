import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortGamesByName,
  filterByGenres,
  orderByRating,
  getVideogames,
  listOfGenresAction,
} from "../../redux/actions/actions";
import style from "./Filters.module.css";

const Filters = ({ filters, setPage, setInput }) => {
  const dispatch = useDispatch();
  const { videogames, genres, listOfGenresfiltered } = useSelector(
    (state) => state
  );

  const handleClickSort = (e) => {
    if (e.target.value === "A-Z") {
      const orderAZ = filters.sort((vg1, vg2) => {
        if (vg1.name.toLowerCase() < vg2.name.toLowerCase()) return -1;
        else if (vg1.name.toLowerCase() > vg2.name.toLowerCase()) return 1;
        else return 0;
      });
      dispatch(sortGamesByName(orderAZ));
    }
    if (e.target.value === "Z-A") {
      const orderZA = filters.sort((vg1, vg2) => {
        if (vg1.name.toLowerCase() > vg2.name.toLowerCase()) return -1;
        else if (vg1.name.toLowerCase() < vg2.name.toLowerCase()) return 1;
        else return 0;
      });
      dispatch(sortGamesByName(orderZA));
    }
  };

  const handleClickFilter = (e) => {
    const genreValue = e.target.value;
    
    if (e.target.checked) {
      const updatedGenres = [...listOfGenresfiltered, genreValue];
      dispatch(listOfGenresAction(updatedGenres));
  
      const filteredByGenre = filters.filter((vg) =>
        vg.genres.includes(genreValue)
      );
  
      if (filteredByGenre.length === 0) {
        dispatch(getVideogames());
        alert("No se encontraron coincidencias");
      } else {
        dispatch(filterByGenres(filteredByGenre));
        setInput(1);
        setPage(1);
      }
    } else {
      const updatedGenres = listOfGenresfiltered.filter((gen) => gen !== genreValue);
      dispatch(listOfGenresAction(updatedGenres));
  
      const uncheckValues = videogames.filter((vg) =>
        updatedGenres.every((gen) => vg.genres.includes(gen))
      );
  
      dispatch(filterByGenres(uncheckValues));
      setInput(1);
      setPage(1);
    }
  };

  const handlerClickRating = (e) => {
    if (e.target.value === "Minor to Mayor") {
      const orderUpward = filters.sort((vg1, vg2) => {
        return vg1.rating - vg2.rating;
      });
      dispatch(orderByRating(orderUpward));
    }
    if (e.target.value === "Mayor to Minor") {
      const orderFalling = filters.sort((vg1, vg2) => {
        return vg2.rating - vg1.rating;
      });
      dispatch(orderByRating(orderFalling));
    }
  };

  const handleDeleteFilters = (e) => {
    dispatch(getVideogames());
    window.location.reload();
  };

  return (
    <div className={style.container_filters}>
      <button name="delete" onClick={(e) => handleDeleteFilters(e)}>
        Borrar Filtros
      </button>

      <div className={style.unit_select}>
        <p className={style.p_filter_G}>Filtrar por Genero:</p>
        <br />        
        <div className={style.container_filter_by_genre}>
          {genres?.map((g, i) => {
            return (
              <div key={i} className={style.bygenre_container}>
                <input
                  className={style.input_style}
                  key={g.id}
                  type="checkbox"
                  value={g.name}
                  name="genres"
                  onClick={(e) => handleClickFilter(e)}
                />
                <label className={style.nameGenre}> {g.name}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className={style.unit_select}>
        <p className={style.ord_por_nom}>Ordenar por Nombre</p>
        <div className={style.container_filter_by_genre}>
          <div className={style.bygenre_container}>
            <input
              className={style.input_style}
              value="A-Z"
              key="1"
              type="radio"
              name="Alphabetic_Order"
              onClick={(e) => handleClickSort(e)}
            />
            <label className={style.nameGenre}> Upward A-Z</label>
          </div>
          <div className={style.bygenre_container}>
            <input
              className={style.input_style}
              value="Z-A"
              key="2"
              type="radio"
              name="Alphabetic_Order"
              onClick={(e) => handleClickSort(e)}
            />
            <label className={style.nameGenre}> Falling Z-A</label>
          </div>
        </div>
      </div>

      <div className={style.unit_select}>
        <p className={style.p_ord_clasf}>Ordenar por Clasif.</p>
        <div className={style.container_filter_by_genre}>
          <div className={style.bygenre_container}>
            <input
              className={style.input_style}
              value="Minor to Mayor"
              key="miTMa"
              type="radio"
              name="Sort_Ranking"
              onClick={(e) => handlerClickRating(e)}
            />
            <label className={style.nameGenre}>Menor a Mayor</label>
          </div>
          <div className={style.bygenre_container}>
            <input
              className={style.input_style}
              value="Mayor to Minor"
              key="MaTmi"
              type="radio"
              name="Sort_Ranking"
              onClick={(e) => handlerClickRating(e)}
            />
            <label className={style.nameGenre}>Mayor a Menor</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
