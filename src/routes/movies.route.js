const express = require('express');
const router = express.Router();
const movie = require('../controllers/movies.controller');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');

router.post('/', movie.create);
router.get('/genre/:genre', movie.readWithGenre);
router.get('/', movie.read);
router.get('/:id', movie.readOne);
router.put('/:id', verifyTokenAdmin, movie.update);
router.delete('/:id', verifyTokenAdmin, movie.delete);


module.exports = router;