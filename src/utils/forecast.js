const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8bc70ad08922a395022bcfe923410e84&query=' + latitude + ',' + longitude + '&units=m';
    // console.log(url);
    request({
        url,
        json: true
// }, (error, response) => {        
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                descr: body.current.weather_descriptions[0]
            })
        }
    })

}

module.exports = forecast