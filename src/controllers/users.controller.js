const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configs = require("../configs");


exports.register = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    isAdmin: false,
    password: hashedPassword,
  });

  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
          isAdmin: data.isAdmin,
          isSub: user.isSub,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    });
};

exports.login = (req, res) => {
  //User.findOne (rechercher l'utilisateur par mail)
  User.findOne({ email: req.body.email })
    .then((user) => {
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        res.status(401).send({
          message: "password not valid",
          auth: false,
          token: null,
        });
      }
      let userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
          isSub: user.isSub,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => res.status(404).send(err));
};

exports.refreshToken = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      let userToken = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
          isSub: user.isSub,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => res.status(404).send(err));
};

exports.getUser = (req, res) => {
  User.findById(req.user.id)
    .then((data) => {
      res.send({
        user: data,
        response: true
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        error: 500,
        message: err.message || "NULL"
      })
    })
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.verifyToken = (req, res) => {
  if (req.user) {
    res.status(200).json({ verify: true })
  }
}