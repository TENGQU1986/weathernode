const geoLocationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const geoLocationToten = '?access_token=pk.eyJ1IjoidGVuZ3F1IiwiYSI6ImNqdDY3cnNicDBlYzc0OW82N2tiMTNqcnQifQ.gbj-S0pQigjpl5h7LLvubg'

const request = require('request')

const geocode = (city, callback) => {
  const url = `${geoLocationURL}${city}.json${geoLocationToten}`
    request({url, json: true}, (error, response) => {
      if (error) {
        callback('Unable to connect to location services', undefined)
      } else if (response.body.features.length === 0) {
        callback('Unable to find location. Try another search', undefined)
      } else {
        callback(undefined, {
          latitude : response.body.features[0].geometry.coordinates[0],
          langitude : response.body.features[0].geometry.coordinates[1],
          location: response.body.features[0].place_name
        })
      }
    })
}

module.exports = geocode