const request = require('request');


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cda130019325b127045d019d6e55eedf&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=f';

    request({ url, json: true }, (err, { body } = {}) => {
        const { current } = body;
        if (err){
            callback("Unable to connect to weather services.", undefined);
        }
        else if (body.error){
            callback("Unable to find location.", undefined);
        }
        else{
            callback(undefined, current.weather_descriptions[0] + ". It is " +
                current.temperature + " degrees out. It feels like " + 
                current.feelslike + " degrees. The wind is blowing at " + current.wind_speed +
                " MPH to the " + current.wind_dir + " .There is " + current.humidity + " percent humidity.");
        }
    });
}

module.exports = forecast;