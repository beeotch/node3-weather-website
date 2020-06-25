const path = require('path') //require core module first before require npm module to stay orgnaize
const express = require('express');
const hbs = require('hbs'); // where to put our partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const {
    response
} = require('express');


// const { allowedNodeEnvironmentFlags } = require('process'); <-- ignore, dafuq is this

// console.log(__dirname) //directory name
// console.log(__filename) //filename

// console.log(__dirname)
// console.log(path.join(__dirname, '../public')) //.. go up 1 folder. then go to public directory

const app = express();
// make the port runs dynamically, if exists which in this case will be running on heroku, it will take the PORT number since its
// not fixed. if it fails (not running on heroku), it will runs locally by taking port 3000
const port = process.env.PORT || 3000;

// Define paths for Express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') //partials 

// Setup handlebars emngine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubDirPath)) //in a way to customize your server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arieff'
    }) // it will match with index in views folder automatically
})

// req = request
// res = response

// below won't run as index.html is added
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//             name: 'Arieff',
//             age: 25
//         },
//         {
//             name: 'Mia',
//             age: 20
//         }
//     ])
// })

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Arieff',
        message: 'Error? Please call 999'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Arieff'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must enter an address!'
        })
    }

    geocode(address, (error, {
        latitude,
        longitude,
        location
    } = {}) => { //default object is entered here to avoid potential errors

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error
                })
            }

            return res.send({
                address,
                location,
                forecastData
            })

        })

    })

    // res.send({
    //     location: req.query.address
    // })

    // res.send({
    //     forecast: "Sunny day",
    //     location: "Shah Alam"
    // })
});

// app.get('/products', (req, res) => {

//     if (!req.query.search) {
//         return res.send({ //add a return syntax to avoid sending response twice which can't be done in HTTP
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query);
//     res.send({
//         products: []
//     })
// })

//404 handler needs to come last
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Arieff'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'My 404 page',
        name: 'Arieff'
    });
});

//app.com      <--- root route (domain)
//app.com/help   <--- routes
//app.com/about 

// port 3000 is a common development port, and this is only for running it locally in our machine
// add beelow to deploy to heroku 

// app.listen(3000, () => {
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})