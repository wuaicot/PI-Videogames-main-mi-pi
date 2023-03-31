const { Router } = require('express');
const videogamesRouter = Router();
// Importar todos los routers;
// const genreRouter = require('./genero');
// Ejemplo: const authRouter = require('./auth.js');
const thegamesRouter = require('./thegames');
const thegendersRouter = require('./thegenders');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 router.use('/vgame', thegamesRouter);
 
 router.use('/genero', thegendersRouter);

module.exports = router;