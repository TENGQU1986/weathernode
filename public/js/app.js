console.log('Client side js file is loaded') 

const getWeather = async (location) => {
  try {
    const response = await fetch(`http://localhost:3000/weather?search=${location}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw Error(error)
  }
  
  
}

const weatherForm = document.querySelector('.searchForm')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let location = search.value
  document.querySelector('.location').innerHTML = 'Loading...'
  document.querySelector('.forecast').innerHTML = ''
  getWeather(location).then(res => {
    if(res.error) {
      return document.querySelector('.location').innerHTML = res.error
    }
    
    document.querySelector('.location').innerHTML = res.location
    document.querySelector('.forecast').innerHTML = res.forecast
  }) 
})