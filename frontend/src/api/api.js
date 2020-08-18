import { noFilter, supportedPlaces, bearer_token } from '../constants/constants'


const url = "http://localhost:8080"

// Usually we would query the twitter API directly. Going through the backend to showcase language interaction
export function getTweetsByType(type, selectedLang) {
  const langAppend = selectedLang === noFilter ? '' : selectedLang

  let fullUrl = `${url}/tweets?type=${type}`

  if (langAppend) {
    fullUrl = fullUrl + `&lang=${langAppend}`
  }

  return fetch(fullUrl)
    .then(resp => {
      return resp.json()
    })
    .then(res => {
      return res
    })
    .catch(err => {
      // console.error(err)
      throw new Error(err)
    })
}

export function getTrendsByPlace(placeId) {

  return fetch(`${url}/trending?id=${placeId}`)
    .then(resp => {
      return resp.json()
    })
    .then(res => {
      return res
    })
    .catch(err => {
      // console.error(err)
      throw new Error(err)
    })
}