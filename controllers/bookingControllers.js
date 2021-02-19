'use strict'
const sequelize = require('./../models/index')
const Booking = require('./../models/booking-models')

const moment = require('moment')
const BookingModel = Booking(sequelize.sequelize, sequelize.Sequelize.DataTypes)

const BookingControllers = {

    createBooking: (req, res) => {
        console.log(req.body.arrival_date)
        console.log(req.body.departure_date)

        var dateStringFirst  =req.body.arrival_date
        var dateStringSecond =req.body.departure_date

        var momentObjFirst = moment(dateStringFirst, moment.ISO_8601);
        var momentObjSecond = moment(dateStringSecond, moment.ISO_8601);

        var momentStringFirst = momentObjFirst.format("dddd, MMMM Do YYYY, h:mm:ss a");
        var momentStringSecond = momentObjSecond.format("dddd, MMMM Do YYYY, h:mm:ss a");

        console.log(momentStringFirst)
        console.log(momentStringSecond)


        // convertedDateArrival = moment('req.body.arrival_date',moment.ISO_8601).format("dddd, MMMM Do YYYY, h:mm:ss a")
        // convertedDateDeparture = moment('req.body.departure_date',moment.ISO_8601).format("dddd, MMMM Do YYYY, h:mm:ss a")

        BookingModel.create({
            arrival_date: momentStringFirst,
            departure_date: momentStringSecond,
            user_id: req.body.user_id,
            client_notes: req.body.client_notes,
            pet_id: req.body.pet_id,
            pet_name: req.body.pet_name,
            email: req.body.user_email,
            status: "awaiting confimation",
            fee: req.body.fee,
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
            .findByPk(req.params.id)

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
                    message: "failed to get booking by id",
                })
            })
    },


    getAllBookingByUser: (req, res) => {
        return BookingModel.findAll({
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

    deleteBookingById: (req, res) => {

        return BookingModel
            .findByPk(req.params.id)
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


    adminGetAllBookings: (req,res) => {
        BookingModel.findAll()
        .then(results => {
            console.log('Works')
            res.json(results)
        })
        .catch(err => {
            console.log('Does not work')
            res.statusCode = 500
            res.json(err)
        })
    },

    bookingStatusUpdate: (req,res) => {
        console.log(req.body)


        BookingModel.update(
            {
                status:req.body.next_status
            },
            {
                where:{id:req.params.id}
            }
        )
        .then(response => {
            console.log(response)
        }) 
        .catch(err => {
            console.log(err)
        })
    },

    bookingEmployeeNotesUpdate: (req,res) => {
        BookingModel.update({
            employee_notes:req.body.employee_notes
        },
        {
            where:{id:req.params.id}
        })
        
        .then(response => {
            console.log(response)
        }) 
        .catch(err => {
            console.log(err)
        })
    }
 


}

module.exports = BookingControllers
