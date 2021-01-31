'use strict'
const jwt = require('jsonwebtoken')
const SHA256 = require("crypto-js/sha256")
const uuid = require('uuid')
const sequelize = require('./../models/index')
const User = require('./../models/user-models')
const UserModel = User(sequelize.sequelize, sequelize.Sequelize.DataTypes)

const userControllers = {
    register: (req, res) => {
        UserModel.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(result => {

                if (result) {
                    res.statusCode = 400
                    res.json({
                        "success": false,
                        "message": "Email has already been taken"
                    })
                    return
                }
                const salt = uuid.v4()
                const combination = salt + req.body.password
                const hash = SHA256(combination).toString()

                UserModel.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    pwsalt: salt,
                    hash: hash
                })
                    .then((createResult) => {
                        res.statueCode = 201;
                        res.json({
                            success: true,
                            message: "registration is successful",
                        });
                    })
                    .catch((err) => {
                        res.statueCode = 409;
                        res.json({
                            success: false,
                            message: "unable to register due to unexpected error",
                        });
                    });
            })
            .catch((err) => {
                res.statueCode = 409;
                res.json({
                    success: false,
                    message: "The register email is exist",
                });
            });
    },

    login: (req, res) => {
        // validate input here on your own

        // gets user with the given email
        UserModel.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(result => {
                // check if result is empty, if it is, no user, so login fail, return err as json response
                if (!result) {
                    res.statusCode = 401
                    res.json({
                        "success": false,
                        "message": "Either username or password is wrong"
                    })
                    return
                }

                // combine DB user salt with given password, and apply hash algo
                const hash = SHA256(result.pwsalt + req.body.password).toString()
                console.log(hash)
                // check if password is correct by comparing hashes
                if (hash !== result.hash) {
                    res.statusCode = 401
                    res.json({
                        "success": false,
                        "message": "Either username or password is wrong"
                    })
                    return
                }

                // login successful, generate JWT
                const token = jwt.sign({
                    email: result.email,
                }, process.env.JWT_SECRET, {
                    algorithm: "HS384",
                    expiresIn: "1h"
                })

                // decode JWT to get raw values
                const rawJWT = jwt.decode(token)

                // return token as json response
                res.json({
                    success: true,
                    token: token,
                    expiresAt: rawJWT.exp
                })
            })
            .catch(err => {
                res.statusCode = 500
                res.json({
                    success: false,
                    message: "Unable to login due to unexpected error"
                })
            })
    },

    getUserProfile: (req, res) => {
       let id = req.params.id
        UserModel.findOne({
            where: {
                email: res.locals.jwtData.email
            }
        })
            .then(userResults => {
                res.json(userResults)
            })
            .catch(err => {
                res.json(err)
            })

    },

    editUserProfile: (req, res) => {
        console.log(res.locals.jwtData)

        UserModel.findOneAndUpdate({
            username: res.locals.jwtData.username
        }, {
            location: req.body.location
        })
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })

    }

}

module.exports = userControllers
