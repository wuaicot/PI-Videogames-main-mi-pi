import axios from "axios";

export const ERROR = "ERROR";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const SEARCH_VIDEOGAME = "SEARCH_VIDEOGAME";
export const GET_ID = "GET_ID";
export const SORT_GAMES_BY_NAME = "SORT_GAMES_BY_NAME";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const LIST_OF_GENRES_FILTERED = "LIST_OF_GENRES_FILTERED";
export const CLEAN_UP = 'CLEAN_UP'

export const getVideogames = (name) => {
  return async function (dispatch) {
    try {
      if (!name) {                         //http://localhost:3001/videogames
        const response = await axios.get("https://backend-videogame.vercel.app"); //https://backend-videogame.vercel.app
        const videogames = response.data;
        //console.log(videogames)
        return dispatch({
          type: GET_VIDEOGAMES,
          payload: videogames,
        });
      } else {
        const response = await axios.get(
          `https://backend-videogame.vercel.app`
        );
        const searchGame = response.data;
        if (searchGame.length === 0) alert("No se ecuentran el juegos con esta palabra");
        return dispatch({
          type: SEARCH_VIDEOGAME,
          payload: searchGame,
        });
      }
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getVideogameDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get( //http://localhost:3001/videogames/${id}
        `https://backend-videogame.vercel.app`//https://backend-videogame.vercel.app
      );
      const videogameDetail = response.data;
      return dispatch({
        type: GET_VIDEOGAME_DETAIL,
        payload: videogameDetail,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    try {                                 //http://localhost:3001/genres
      const response = await axios.get("https://backend-videogame.vercel.app"); //https://backend-videogame.vercel.app
      const genres = response.data;
      return dispatch({
        type: GET_GENRES,
        payload: genres,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getID = (id) => {
  const idToStr = id.toString();
  getVideogameDetail(id);
  return {
    type: GET_ID,
    payload: idToStr,
  };
};

export const sortGamesByName = (order) => {
  return async function (dispatch) {
    dispatch({
      type: SORT_GAMES_BY_NAME,
      payload: order,
    });
  };
};

export const filterByGenres = (array) => {
  return async function (dispatch) {
    dispatch({
      type: FILTER_BY_GENRES,
      payload: array,
    });
  };
};

export const listOfGenresAction = (genres) => {
  return {
    type: LIST_OF_GENRES_FILTERED,
    payload: genres,
  };
};

export const orderByRating = (array) => {
  return async function (dispatch) {
    dispatch({
      type: ORDER_BY_RATING,
      payload: array,
    });
  };
};

export const searchVideogame = (name) => {
    return async function(dispatch) {
        try {                                     //http://localhost:3001/videogames?name=${name}
            const response = await axios.get(`https://backend-videogame.vercel.app`);  //https://backend-videogame.vercel.app
            const searchGame = response.data;
            return dispatch({
                type: SEARCH_VIDEOGAME,
                payload: searchGame
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}

// export const cleanUp = () => {
//     return ({
//         type: CLEAN_UP,
//         payload: []
//     })
// }
