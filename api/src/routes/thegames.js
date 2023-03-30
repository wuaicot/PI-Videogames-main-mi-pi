const express = require('express');
const {apikey, Videogame, Genero, /*conn */} = require('../db');
const router = express.Router();
const axios = require('axios');


router.get('/vgame', async (req, res) => {
    try {
      const games = await Videogame.findAll();
      res.json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;