const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            auth: false,
            token: null,
            message: "missing token"
        })
    }

    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (decoded.isAdmin == false) {
            return res.status(401).send({
                auth: false,
                token: null,
                message: "no rights"
            })
        } else {
            if (err) {
                return res.status(401).send({
                    auth: false,
                    token: null,
                    message: "no authorized"
                })
            }
            next();
        }
    })
}

module.exports = verifyToken;