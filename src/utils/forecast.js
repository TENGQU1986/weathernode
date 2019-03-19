const request = require('request')

const SECRET_KEY = 'da4e068a1d82f48b81ee19de83e534e2'
const darkSkyURL = 'https://api.darksky.net/forecast/'

const forecast = (latitude, langitude, callback) => {
  const urlDark = `${darkSkyURL}${SECRET_KEY}/${latitude},${langitude}`

  request({url: urlDark, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to server', undefined)
    } else if (response.body.code === 400) {
      callback('Unable to get weather, check latitude and langitude, then try again', undefined)
    } else {
      const { temperature, precipProbability } = response.body.currently
      callback(undefined, {
        forecast: `It is currently ${temperature} degrees out, There is ${precipProbability} chance of rain`
      })
    }
  })
}

module.exports = forecast