'use strict'
const sequelize = require('./../models/index')
const Pet = require('./../models/pet-models')
const PetModel = Pet(sequelize.sequelize, sequelize.Sequelize.DataTypes)

const petControllers = {

    createPet: (req, res) => {

        PetModel.create({
            client_id: req.body.client_id,
            pet_name: req.body.pet_name,
            pet_type: req.body.pet_type,
            pet_breed: req.body.pet_breed,
            email: req.body.email
        })
            .then(result => {
                if (result) {
                    res.statusCode = 201;
                    res.json({
                        success: true,
                        result: result,
                        message: "success creating pet",
                    })
                }
            })
            .catch(err => {
                res.statusCode = 401;
                res.json({
                    success: false,
                    err: err,
                    message: "failed to create new pet",
                })
            })

            .catch((err) => {
                res.statueCode = 409;
                res.json({
                    success: false,
                    message: "Error",
                });
                console.log(err)
            });
    },

    getPetById: (req, res) => {

        console.log(req.params.id)

        return PetModel
            .findByPk(req.params.id)

            // PetModel.findOne({
            //     id: req.params.pet_id,
            // })
            .then(response => {
                console.log(response)
                res.statusCode = 201;
                res.json({
                    success: true,
                    result: response,
                    message: "id Found",
                })


            })
            .catch(err => {
                res.statusCode = 401;
                res.json({
                    success: false,
                    err: err,
                    message: "failed to get pet by id",
                })
            })
    },


    getAllPetsByUser: (req, res) => {
        return PetModel.findAll({
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



    deletePetById: (req, res) => {

        return PetModel
            .findByPk(req.params.pet_id)
            .then(result => {
                if (!result) {
                    return res.status(400).send({
                        message: 'result Not Found',
                    });
                }
                return result
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));

            })
            .catch((error) => res.status(400).send(error));

    },



}

module.exports = petControllers
