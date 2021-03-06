require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken')
// =======================================
//
//    ------DEFINE MIDDLEWARES
//
// =======================================
const upload = require("./middleware/upload");

app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    origin: '*'
}))

app.options('*', cors())
// =======================================
//
//    ------DEFINE CONTROLLERS
//
// =======================================
const userControllers = require('./controllers/userControllers')
const petControllers = require('./controllers/petControllers');
const bookingControllers = require('./controllers/bookingControllers')
const petImageControllers = require('./controllers/petImageControllers')
const usersProfileImageControllers  =require ('./controllers/useProfileImageControllers');
const bookingModels = require('./models/booking-models');
const BookingControllers = require('./controllers/bookingControllers');

// =======================================
//
//    -----------ROUTES
//
// =======================================

// Test Connection
app.get('/api/v1', (req, res) => {
    res.json({
        message: "Pet Hotel Backend Running"
    })
})

// =======================================
//    ------USERS ROUTES
// =======================================

// user registration
app.post('/api/v1/users/register', userControllers.register)
// user login route
app.post('/api/v1/users/login', userControllers.login)
// get user by id
app.get('/api/v1/users/profile',verifyJWT,userControllers.getUserProfile)
// upload image by user
app.post('/api/v1/users/profile/upload',verifyJWT,usersProfileImageControllers.uploadUserProfileImage)
// get uploaded user profile image
app.get('/api/v1/users/profileimage',verifyJWT,usersProfileImageControllers.getUserProfileImage)
// delete user profile image
app.delete('/api/v1/users/profileimagedelete',verifyJWT,usersProfileImageControllers.deleteProfileImage)

// =======================================
//    ------PET ROUTES
// =======================================

// pet creation
app.post('/api/v1/pets/create',petControllers.createPet)
// get pet by id
app.get('/api/v1/pets/:id',petControllers.getPetById)
// delete pet by id
app.delete('/api/v1/pets/:pet_id',petControllers.deletePetById)
// get all pets created by user
app.get('/api/vi/allpet',verifyJWT,petControllers.getAllPetsByUser)

// upload image by pet
app.post('/api/v1/pet/:id/profile/upload',petImageControllers.uploadPetProfileImage)
// get uploaded pet profile image
app.get('/api/v1/pet/:id/profileimage',petImageControllers.getPetProfileImageById)
// delete user pet image
app.delete('/api/v1/pet/:id/profile/delete',petImageControllers.deletePetProfileImage)



// =======================================
//    ------BOOKING ROUTES
// =======================================

// booking creation
app.post('/api/v1/bookings/create', bookingControllers.createBooking)
// get booking by id
app.get('/api/v1/bookings/:id',bookingControllers.getBookingById)
// delete pet by id
app.delete('/api/v1/bookings/:id',bookingControllers.deleteBookingById)
// get booking by user
// get all pets created by user
app.get('/api/vi/allbooking',verifyJWT,bookingControllers.getAllBookingByUser)


// =======================================
//    ------ADMIN ROUTES
// =======================================
app.get('/api/v1/admin/getallbookings',bookingControllers.adminGetAllBookings)
app.patch('/api/v1/bookings/:id/update',bookingControllers.bookingStatusUpdate)
// =======================================
//
//    ----------LISTENER
//
// =======================================
app.listen(process.env.PORT || port, () => {
    console.log(`Pet Hotel App on port: ${port}`)
})

function verifyJWT(req, res, next) {
    // get the jwt token from the request header
    const authToken = req.headers.auth_token
    console.log(authToken)
    // check if authToken header value is empty, return err if empty
    if (!authToken) {
        res.json({
            success: false,
            message: "Auth header value is missing"
        })
        return
    }

    // verify that JWT is valid and not expired
    try {
        // if verify success, proceed
        const userData = jwt.verify(authToken, process.env.JWT_SECRET, {
            algorithms: ['HS384']
        })
        // store jwt token into res.locals.jwtData
        res.locals.jwtData = userData;
        next()
    } catch (err) {
        // if fail, return error msg

        res.json({
            success: false,
            message: "Auth token is invalid"
        })
        return
    }
}