const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Defining paths for express
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static dir
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Jack"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Jack"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: 'Jack',
        message: "Do you need help?"
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (err, { lat, long, location } = {}) => {
        if (err){
            return res.send({
                error: err
            });
        }
        forecast(lat, long, (err, weatherRes) => {
            if (err) {
                return res.send({
                    error: err
                });
            }
            
            return res.send({
                location: location,
                forecast: weatherRes,
                address: req.query.address
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message404: "Help article not found.",
        name: "Jack",
        title: "404"
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        message404: "Page not found.",
        name: 'Jack',
        title: "404"
    })
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});