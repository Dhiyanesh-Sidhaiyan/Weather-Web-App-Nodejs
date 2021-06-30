const request = require('request');

const geoCode = (address, callback) => {

    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGhpeWFuZXNoIiwiYSI6ImNrcWdjcHhzMTByeGozMXBlOXhxcG4wYTUifQ.vEWdRCJ5FqVFNo8iGzsrLg&limit=2'

    request({ url: geoCodeUrl, json: true }, (error, {body, features = body.features}) => {

        if (error) {
            callback('Unable to connect to the service provider',undefined);
        } else if (body.error) {
            callback('error at url, please check',undefined);
        } else if (features && features.length === 0) {
            callback('No match found for given search address. Please try another',undefined);
        } else if (body.message){
            callback('Record not found. Please try another address',undefined);
        }else {
            const geocoding = features[0].center;
            callback(undefined,{
                latitude :geocoding[1],
                longitude :geocoding[0],
                location : features[0].place_name
            });
        }
    });
}

module.exports = geoCode;