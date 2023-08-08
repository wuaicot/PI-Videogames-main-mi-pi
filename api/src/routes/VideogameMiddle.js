const axios = require("axios");
const express = require("express");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const { API_KEY } = process.env;

const router = express.Router();
router.use(express.json());

const getAllGamesAPI = async (num) => {
  //We get the first 100 games
  let adress = `https://api.rawg.io/api/games?key=${API_KEY}`;
  let allGamesArray = [];

  let counter = 1;

  while (counter <= num) {
    const api = await axios.get(adress);

    api.data.results.map((vg) =>
      allGamesArray.push({
        id: vg.id,
        name: vg.name,
        description: vg.description,
        released: vg.released,
        image: vg.background_image,
        rating: vg.rating,
        genres: vg.genres.map((g) => g.name),
        platforms: vg.platforms.map((g) => g.platform.name),
      })
    );

    adress = api.data.next;
    counter++;
  }

  return allGamesArray;
};

router.get("/", async (req, res) => {
  try {
    const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const { name, number } = req.query;
    const db = await Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    let num = !number ? 5 : number;
    let allVideogamesAPI = await getAllGamesAPI(num);

    if (!name) {
      let add = [...allVideogamesAPI, ...db];

      return res.status(200).json(add);
    } else {
      const filteredGamesApi = allVideogamesAPI.filter((vg) =>
        vg.name.toLowerCase().includes(name.toLowerCase())
      );

      const filteredDb = db.filter((vg) =>
        vg.name.toLowerCase().includes(name.toLowerCase())
      );

      const addingFilters = [...filteredGamesApi, ...filteredDb];

      addingFilters.length === 0
        ? res.status(404).send(`La palabra "${name}", no ha sido encontrada`)
        : res.status(200).json(addingFilters.slice(0, 15));
    }
  } catch (error) {
    return res.status(404).send(" Ha ocurrido un error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const changeToStr = id.toString();
    if (changeToStr.length === 36) {
      const findById = await Videogame.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      !findById
        ? res.status(404).send(`El id ${id} no ha sido encontrado`)
        : res.status(200).json(findById);
    } else {
      let url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;

      const api = await axios.get(url);
      const apiGame = {
        id: api.data.id,
        name: api.data.name,
        description: api.data.description_raw,
        released: api.data.released,
        image: api.data.background_image,
        rating: api.data.rating,
        genres: api.data.genres.map((g) => g.name),
        platforms: api.data.platforms.map((p) => p.platform.name),
      };

      return res.status(200).json(apiGame);
    }
  } catch (error) {
    return res.status(400).send("Ocurrio un error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, released, image, rating, platforms, genres } =
      req.body;

    const gameExists = await Videogame.findOne({
      where: {
        name: {
          [Op.substring]: name,
        },
      },
    });

    const obj = { name, description, released, image, rating, platforms };

    if (!name || !description || !image || !platforms || !genres)
      return res.status(400).send("Debe escribir todos los datos");
    else if (!gameExists) {
      const newVideogame = await Videogame.create({
        id: uuidv4(),
        ...obj,
      });

      console.log(newVideogame.__proto__)
      newVideogame.addGenres(genres);

      return res
        .status(200)
        .send("El juego fue creado con éxito");
    } else {
      gameExists.name = name;
      gameExists.description = description;
      gameExists.released = released;
      gameExists.image = image;
      gameExists.rating = rating;
      platforms.platforms = platforms;

      gameExists.addGenres(genres);

      await gameExists.save();

      return res.status(200).json(gameExists);
    }
  } catch (error) {
    return res.status(404).send("Ocurrió un error al intentar crear el Juego");
  }
});

module.exports = router;
