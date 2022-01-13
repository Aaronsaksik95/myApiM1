const express = require('express');
const router = express.Router();
const movie = require('../controllers/movies.controller');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');

router.post('/movies', movie.create);
router.get('/movies/genre/:genre', movie.readWithGenre);
router.get('/movies', movie.read);
router.get('/movies/:id', movie.readOne);
router.put('/movies/:id', verifyTokenAdmin, movie.update);
router.delete('/movies/:id', verifyTokenAdmin, movie.delete);


module.exports = router;