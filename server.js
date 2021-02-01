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
const usersProfileImageControllers  =require ('./controllers/useProfileImageControllers')

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
// get uploaded profile image
app.get('/api/v1/users/profileimage',verifyJWT,usersProfileImageControllers.getUserProfileImage)
// 
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

// =======================================
//    --PET PROFILE IMAGE ROUTES
// =======================================

// pet creation
app.post('/api/v1/pets/upload', upload.single("file"), petImageControllers.uploadPetImage)

// =======================================
//    --USERS PROFILE IMAGE ROUTES
// =======================================

// user profile image creation
// app.post('/api/v1/pets/upload', upload.single("file"), petImageControllers.uploadPetImage)

// =======================================
//    ------BOOKING ROUTES
// =======================================

// pet creation
app.post('/api/v1/bookings/create', bookingControllers.createBooking)
// get pet by id
app.get('/api/v1/bookings/:booking_id',bookingControllers.getBookingById)
// delete pet by id
app.delete('/api/v1/bookings/:booking_id',bookingControllers.deleteBookingById)


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