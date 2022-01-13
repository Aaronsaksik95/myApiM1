const Movie = require('../models/movie.model');

exports.create = (req, res) => {
    const movie = new Movie({
        price: req.body.price,
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
        image: req.body.image,
    });

    movie.save()
        .then((data) => {
            res.send({
                movie: data,
                created: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating movie"
            })
        })

}
exports.read = (req, res) => {
    Movie.find()
        .then((data) => {
            res.send({
                movies: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating movie"
            })
        })

}

exports.readOne = (req, res) => {
    Movie.findById(req.params.id)
        .then((data) => {
            res.send({
                movie: data,
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

exports.readWithGenre = (req, res) => {
    Movie.find({ genre: req.params.genre })
        .then((data) => {
            res.send({
                movies: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating movie"
            })
        })
}

exports.update = (req, res) => {
    Movie.findByIdAndUpdate(
        req.params.id,
        {
            price: req.body.price,
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            image: req.body.image,
        }
    )
        .then(() => {
            getOne(req.params.id)
                .then((data) => {
                    res.send({
                        movie: data,
                        update: true
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        error: 500,
                        message: err.message || "NULL"
                    })
                })
        })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
}

exports.delete = (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send({
                delete: true
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