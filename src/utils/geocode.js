const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2Nvc2NvYm9sYSIsImEiOiJja3FyMHlqbDYxa2pqMm9xcTFpdGRkcGZxIn0.7NW2N2tQQJbsFKBKpHKGUg';

    request({ url, json: true }, (err, { body } = {}) => {
        const { features } = body;
        if (err){
            callback('Unable to connect to location servies', undefined);
        }
        else if (features.length === 0){
            callback('Unable to find location.', undefined);
        }
        else{
            callback(undefined, {location: features[0].place_name, 
                lat: features[0].center[1], 
                long: features[0].center[0]});
        }
    });
}

module.exports = geocode;