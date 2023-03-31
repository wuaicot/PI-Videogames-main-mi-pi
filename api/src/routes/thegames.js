const express = require('express');
const {apikey, Videogame, Genero, } = require('../db');

const axios = require('axios');
const router = express.Router();


router.get('/vgame', async (req, res) => {
    try {
      const games = await Videogame.findAll();
      res.json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

    

  });

  router.get('/videogames/:idVideogame', async (req, res) => {
    try {
      const idVideogame = req.params.idVideogame;
      let videogame = null;
      let genre = null;
  
      // Lógica para buscar el videojuego en la base de datos
      // utilizando el modelo Videogame
      videogame = await Videogame.findByPk(idVideogame, {
        include: {
          model: Genero,
          attributes: ['name'],
        },
      });
  
      // Si el videojuego no se encontró en la base de datos,
      // buscarlo en la API
      if (!videogame) {
        const response = await axios.get(`https://api.example.com/videogames/${idVideogame}`);
        videogame = response.data;
      }
  
      // Obtener los datos del género asociado al videojuego
      genre = videogame.genero.name;
  
      // Crear un objeto de respuesta con la información requerida
      const videogameWithGenre = {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        releaseDate: videogame.releaseDate,
        rating: videogame.rating,
        genre: genre,
      };
  
      // Enviar la respuesta al cliente
      res.json(videogameWithGenre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

  module.exports = router;