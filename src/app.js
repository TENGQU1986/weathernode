const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Teng Qu'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Teng'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'Feel free to contact us if you got questions',
    title: 'Help',
    name: 'Teng Qu'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.search
  if(!address) {
    return res.send({
      error: 'Please provide a valid location to continue'
    })
  }
 
  geocode(address, (err, { latitude, langitude, location} = {}) => {
    if (err) {
      return { err }
    }
    forecast(latitude, langitude, (e, result) => {
      if (e) {
        return { e }
      }
      res.send({
        forecast: result.forecast,
        location,
        address: req.query.search
      })
    })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('notFoundPage', {
    errorMsg: 'Help article not found',
    name: 'Teng',
    title: 404
  })
})

app.get('*', (req, res) => {
  res.render('notFoundPage', {
    errorMsg: 'Page not found',
    name: 'Teng',
    title: '404'
  })
})

app.listen(3000, () => {
  console.log('Server is running on 3000')
})

