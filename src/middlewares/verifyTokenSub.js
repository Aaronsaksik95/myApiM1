const jwt = require('jsonwebtoken')

function verifyTokenSub(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            auth: false,
            token: null,
            message: "missing token"
        })
    }
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (decoded.isSub == false) {
            return res.status(401).send({
                sub: false,
                token: null,
                message: "no sub"
            })
        } else {
            if (err) {
                return res.status(401).send({
                    sub: false,
                    token: null,
                    message: "no authorized"
                })
            }
            req.user = decoded;
            next();
        }
    })
}

module.exports = verifyTokenSub;