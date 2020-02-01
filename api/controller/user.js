const User = require("../model/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("../util/globalFunc");

exports.getAllUsrs = (req, res, next) => {
  User.find()
    .exec()
    .then(result => {
      res
        .status(200)
        .json(
          util._request_response("GET", "/users", "get users", true, result)
        );
    })
    .catch(err => {
      res
        .status(500)
        .json(
          util._request_response("GET", "/users", "get users", false, result)
        );
    });
};

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err)
      res.status(404).json({
        error: err
      });
    else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        fbid: req.body.fbid,
        password: hash
      });

      User.findOne({ username: user.username })
        .then(result => {
          if (result)
            res
              .status(200)
              .json(
                util._request_response(
                  "POST",
                  "/users/add",
                  "username already used before",
                  false,
                  result
                )
              );
          else
            user
              .save()
              .then(result => {
                res
                  .status(201)
                  .json(
                    util._request_response(
                      "POST",
                      "/users/add",
                      "Add user succesfull",
                      true,
                      result
                    )
                  );
              })
              .catch(err => {
                res
                  .status(500)
                  .json(
                    util._request_response(
                      "POST",
                      "/users/add",
                      "Add user failed",
                      false,
                      err
                    )
                  );
              });
        })
        .catch(err => {
          res
            .status(500)
            .json(
              res
                .status(500)
                .json(
                  util._request_response(
                    "POST",
                    "/users/add",
                    "Add user failed",
                    false,
                    err
                  )
                )
            );
        });
    }
  });
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  res.setHeader("Access-Control-Allow-Origin", "*");
  User.findOne({ username: username })
    .then(user => {
      if (user)
        bcrypt.compare(password, user.password, (err, hashed) => {
          if (hashed) {
            const token = jwt.sign(
              {
                name: user.name,
                lastname: user.lastname,
                fbid: user.fbid,
                username: user.username
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            res
              .status(200)
              .json(
                util._request_response(
                  "POST",
                  "/users/login",
                  "auth succed",
                  true,
                  user
                )
              );
          } else
            res
              .status(404)
              .json(
                util._request_response(
                  "POST",
                  "/users/login",
                  "auth failed",
                  false,
                  user
                )
              );
        });
      else
        res
          .status(409)
          .json(
            util._request_response(
              "POST",
              "/users/login",
              "user not found",
              false,
              user
            )
          );
    })
    .catch(err => {
      res
        .status(500)
        .json(
          util._request_response(
            "POST",
            "/users/login",
            "auth failed",
            false,
            err
          )
        );
    });
};
