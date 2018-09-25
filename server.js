require("dotenv").config()
var path = require("path")
var express = require("express")
var webpack = require("webpack")
var faker = require("faker")
var AccessToken = require('twilio').jwt.AccessToken
var VideoGrant = AccessToken.VideoGrant

var app = express()
if(process.env.NODE_ENV === "DEV") {
    var webpackDevMiddleware = require("webpack-dev-middleware")
    var webpackHotMiddleware = require("webpack-hot-middleware")
    var webpackConfig = require("./webpack.config.js")
    const webpackCompiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(webpackCompiler, {
        hot: true
    }))
    app.use(webpackHotMiddleware(webpackCompiler))
    app.use(express.static(path.join(__dirname, "app")))
} else if (process.env.NODE_ENV === "PROD") {
    app.use(express.static(path.join(__dirname, "dist")))
}


app.get('/token', function(request, response) {
    var identity = faker.name.findName()

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
        )

        // Assign the generated identity to the token
        token.identity = identity

        const grant = new VideoGrant()
        // Grant token access to the Video API features
        token.addGrant(grant)
        // Serialize the token to a JWT string and include it in a JSON response
        response.send({
            identity: identity,
            token: token.toJwt()
        })
    })

    app.get('/create/:room', (request, response) => {
        const AccessToken = require('twilio').jwt.AccessToken
        const VideoGrant = AccessToken.VideoGrant

        var identity = faker.name.findName()

        // Create Video Grant
        const videoGrant = new VideoGrant({
            room: request.params.room,
        })

        // Create an access token which we will sign and return to the client,
        // containing the grant we just created
        var token = new AccessToken(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_API_KEY,
            process.env.TWILIO_API_SECRET
            )

            token.addGrant(videoGrant)
            token.identity = identity

            let options = {
                maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                httpOnly: false, // The cookie only accessible by the web server
                signed: false // Indicates if the cookie should be signed
            }

            // Serialize the token to a JWT string
            const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
            // client.video.rooms.create({uniqueName: request.params.room})
            // .then(room => console.log(room, room.sid))
            // .then(response.cookie('room', request.params.room, options))
            // .then(response.redirect('/'))
            // .done()
            response.cookie('createRoom', request.params.room, options)
            response.redirect('/')
        })

        app.get('/join/:room', (request, response) => {
            const AccessToken = require('twilio').jwt.AccessToken
            const VideoGrant = AccessToken.VideoGrant

            var identity = faker.name.findName()

            // Create Video Grant
            const videoGrant = new VideoGrant({
                room: request.params.room,
            })

            // Create an access token which we will sign and return to the client,
            // containing the grant we just created
            var token = new AccessToken(
                process.env.TWILIO_ACCOUNT_SID,
                process.env.TWILIO_API_KEY,
                process.env.TWILIO_API_SECRET
                )

                token.addGrant(videoGrant)
                token.identity = identity

                let options = {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: false, // The cookie only accessible by the web server
                    signed: false // Indicates if the cookie should be signed
                }

                const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
                response.cookie('joinRoom', request.params.room, options)
                response.redirect('/')
            })

        app.get('/', (request, response)=> {
            response.cookie("createRoom", "", { expires: new Date(0),domain:'.test.com', path: '/' });
        })

        var port = process.env.PORT || 3000
        app.listen(port, function() {
            console.log("Express server listening on *:" + port)
        })
