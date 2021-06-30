const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs'); // hbs - > Handle bar for dynamic templates.. instead of html static

//utility
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');
const port = process.env.PORT || 3000;

//directory path configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirPath = path.join(__dirname, '../templates/views');
const partialDirPath = path.join(__dirname, '../templates/partials')


// Setup handler bar engineer and 'views' directory location.
app.set('views', viewDirPath);
app.set('view engine', 'hbs');   // Express.js view engine for handlebars
hbs.registerPartials(partialDirPath);

//setup for static folder to serve
app.use(express.static(publicDirectoryPath)); // It will load public file automatically when page requested. index.html

app.get('/', (req, res) => {   // default route
    res.render('index', {
        title: "Weather App",
        name: "Created by Dhiyanesh Sidhaiyan"

    });  //render message to hbs 
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Created by Dhiyanesh Sidhaiyan"
    });  //render message to hbs 
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Us",
        helperText: 'This is help session',
        name: "Created by Dhiyanesh Sidhaiyan"
    });
});

app.get('/weather', (req, res) => {  //weather route

    // console.log(req.query,"Query In Web url");

    if (!req.query.address) {
        return res.send({
            error: "You must provide an Address"
        });
    }

    let address = req.query.address;

    geoCode(address, (error, { latitude, longitude, location }={}) => {  // destructure object should be default parameter, to avoid error 
        if (error) {
            return res.send({
                'error': error
            });
        }
        foreCast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    'error': error
                });
            }
            console.log(location);
            console.log(forcastData);
            res.send({
                forecast: forcastData,
                location: location,
                address: address
            });
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404",
        name: 'Created by Dhiyanesh Sidhaiyan',
        errorMessage: "Help article not found",
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: "404",
        name: 'Created by Dhiyanesh Sidhaiyan',
        errorMessage: "Page Not Found.",
    });
});

app.listen(port, () => {
    console.log('Web server up and listening on port 3000');
});