const request = require('request');

const foreCast = (latitude, longitude, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=e0d5cb1f014868fc74df21d1b68e306a&query=${latitude},${longitude}`;
    
    request({ url, json: true }, (error, { body } ={}) => {
        // console.log(body, "body");
        try{
            if (error) {
                callback('Unable to connect to the service provider', undefined);
            } else if (!body.current.temperature && !body.current.feelslike) {
                callback('There is no forcast available. Please try another', undefined);
            } else {
                const data = `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degree, There is a ${body.current.feelslike}% chance of rain`;
                callback(undefined, data);
            }

        }catch{
            callback('Unable to connect to the service provider', undefined);
        }
    });
}

module.exports = foreCast;