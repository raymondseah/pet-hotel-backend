'use strict'
const sequelize = require('./../models/index')
const Booking = require('./../models/booking-models')
const BookingModel = Booking(sequelize.sequelize, sequelize.Sequelize.DataTypes)

const BookingControllers = {

    createBooking: (req, res) => {
        console.log(req.body)

        BookingModel.create({
            arrival_date: req.body.arrival_date,
            departure_date: req.body.departure_date,
            user_id:req.body.user_id,
            client_notes: req.body.client_notes,
            pet_id:req.body.pet_id,
            email:req.body.user_email,
            status: "awaiting comfimation",
            fee : req.body.fee,


        })
            .then(result => {
                if (result) {
                    res.statusCode = 201;
                    res.json({
                        success: true,
                        result: result,
                        message: "success creating bookings",
                    })
                }
            })
            .catch(err => {
                res.statusCode = 401;
                res.json({
                    success: false,
                    err: err,
                    message: "failed to create new bookings",
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

    getBookingById: (req, res) => {

        return BookingModel
            .findByPk(req.params.booking_id)

        // PetModel.findOne({
        //     id: req.params.pet_id,
        // })
            .then(response => {

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

    deleteBookingById: (req, res) => {

        return BookingModel
            .findByPk(req.params.booking_id)
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

module.exports = BookingControllers
