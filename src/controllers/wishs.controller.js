const Wish = require('../models/wish.model');

exports.addWish = (req, res) => {
    Wish.findOne({ user: req.user.id })
        .then((wish) => {
            if (wish) {
                if (!wish.movies.includes(req.body.movie)) {
                    Wish.findOneAndUpdate(
                        { user: req.user.id },
                        {
                            user: req.user.id,
                            movies: [...wish.movies, req.body.movie],
                        },
                        {
                            new: true
                        }
                    )
                        .then((data) => {
                            res.send({
                                wish: data,
                                addWish: true
                            })
                        })
                        .catch((err) => {
                            res.status(500).send({
                                error: 500,
                                message: err.message || "NULL"
                            })
                        })
                }
                else {
                    res.send({
                        addWish: false,
                        message: "Already in your list"
                    })
                }
            }
            else {
                const newWish = new Wish({
                    user: req.user.id,
                    movies: [req.body.movie]
                });

                newWish.save()
                    .then((data) => {
                        res.send({
                            wish: data,
                            created: true
                        })
                    })
                    .catch((err) => {
                        console.log(err.message);
                        res.status(500).send({
                            error: 500,
                            message: err.message || "NULL"
                        })
                    })
            }
        })
}

exports.readOne = (req, res) => {
    Wish.findOne({ user: req.user.id })
        .populate({
            path: 'movies',
            populate: { path: 'category' }
        })
        .then((data) => {
            res.send({
                wish: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
}

exports.verifyMovieInWish = (req, res) => {
    Wish.findOne({ user: req.user.id })
        .then((data) => {
            if (data.movies.includes(req.params.movieId)) {
                res.send({
                    exist: true
                })
            }
            else {
                res.send({
                    exist: false
                })
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
}

exports.deleteOne = (req, res) => {
    Wish.findOne({ user: req.user.id })
        .then((wish) => {
            const arrayMovieWish = wish.movies.filter(movie => movie != req.body.movie)
            Wish.findOneAndUpdate(
                { user: req.user.id },
                {
                    user: req.user.id,
                    movies: arrayMovieWish,
                },
                {
                    new: true
                }
            )
                .then((data) => {
                    res.send({
                        wish: data,
                        response: true
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        error: 500,
                        message: err.message || "NULL"
                    })
                })
        })
}