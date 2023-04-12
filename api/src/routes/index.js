const { Router } = require('express');
const express = require('express');

const router = Router();

const videogameMiddleware = require('./VideogameMiddle.js');
const genreMiddleware = require('./GenreMiddle.js');

router.use(express.json());

router.use('/videogames', videogameMiddleware);
router.use('/genres', genreMiddleware);



module.exports = router;


