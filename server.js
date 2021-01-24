require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 5000;


app.use(express.urlencoded({
    extended: true
}))


// =======================================
//
//    ------DEFINE CONTROLLERS
//
// =======================================
const userControllers = require('./controllers/userControllers')
const petControllers = require('./controllers/petControllers');
const bookingControllers = require('./controllers/bookingControllers')

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

// =======================================
//    ------PET ROUTES
// =======================================

// pet creation
app.post('/api/v1/pets/create', petControllers.createPet)
// get pet by id
app.get('/api/v1/pets/:pet_id',petControllers.getPetById)
// delete pet by id
app.delete('/api/v1/pets/:pet_id',petControllers.deletePetById)

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