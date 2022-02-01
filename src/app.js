const path = require(`path`)
const express = require(`express`)
const hbs = require(`hbs`)
const geocode = require(`./utils/geocode`)
const forecast = require(`./utils/forecast`)

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, `../public`)
const viewsPath = path.join(__dirname, `../templates/views`)
const partialsPath = path.join(__dirname, `../templates/partials`)

// Setup handlebars engine and views location
app.set(`view engine`, `hbs`)
app.set(`views`, viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get(``, (req, res) => {
    res.render(`index`, {
        title: `Weather`,
        name: `Noam Nehemia`
    })
})

app.get(`/about`, (req, res) => {
    res.render(`about`, {
        title: `About`,
        name: `Noam Nehemia`
    })
})

app.get(`/help`, (req, res) => {
    res.render(`help`, {
        title: `Help`,
        message: `Some helpful text`,
        email: `noamikon@gmail.com`,
        name: `Noam Nehemia`
    })
})

app.get(`/weather`, (req, res) => {
    const locationInput = req.query.address
    if (!locationInput) {
        return res.send({
            error: `You must provide a location`
        })
    }
    req.query

    geocode(locationInput, (error, { latitude, longitude, location } = {}) => {

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

            res.send({
                forecast: forecastData,
                location,
                address: locationInput
            })
        })
    })
})

app.get(`/products`, (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: `You must provide a search term`
        })
    }
    req.query
    res.send({
        products: []
    })
})

app.get(`/help/*`, (req, res) => {
    res.render(`404page`, {
        title: `Woops...`,
        404: `Help article not found`,
        name: `Noam Nehemia`
    })
})

app.get(`*`, (req, res) => {
    res.render(`404page`, {
        title: `Woops...`,
        404: `Page Not Found`,
        name: `Noam Nehemia`
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})