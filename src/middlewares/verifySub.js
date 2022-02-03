const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const applyResolverMid = require('apollo-resolver-middleware');
const movieResolver = require('../apollo/resolvers/movie.resolver');


applyResolverMid(movieResolver, 'Query.getMovies', (args, context, next) => {
    // do something
    return next()
  })
  

function verifySub(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            auth: false,
            token: null,
            message: "missing token"
        })
    }

    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        User.findById(decoded.id)
            .then((data) => {
                if (data.isSub == false) {
                    return res.status(401).send({
                        sub: false,
                        token: null,
                        message: "No sub"
                    })
                } else {
                    if (err) {
                        return res.status(401).send({
                            sub: false,
                            token: null,
                            message: "no authorized"
                        })
                    }
                    next();
                }
            })
            .catch((err) => {
                console.log(err.message);
                res.status(500).send({
                    error: 500,
                    message: err.message || "NULL"
                })
            })

    })
}

module.exports = verifySub;