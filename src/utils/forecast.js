const request = require(`request`)

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0a176fccda07e3b7ad0be9a18497e3cb&query=${latitude},${longitude}`
    
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback(`Unable to connect to weather service!`, undefined)
        } else if (!body.current) {
            callback(`Unable to find location`, undefined)
        } else {
            const descrip = body.current.weather_descriptions[0]
            const degrees = body.current.temperature
            const feels = body.current.feelslike
            callback(undefined, `${descrip}. It is currently ${degrees} degrees out. It feels like ${feels} degrees out.`)
        }
    })
}

module.exports = forecast