const express = require('express');
const router = express.Router();
const wish = require('../controllers/wishs.controller');
const verifyTokenSub = require('../middlewares/verifyTokenSub');

router.get('/', verifyTokenSub, wish.readOne);
router.get('/verify/:movieId', verifyTokenSub, wish.verifyMovieInWish);
router.post('/', verifyTokenSub, wish.addWish);
router.put('/', verifyTokenSub, wish.deleteOne);


module.exports = router;