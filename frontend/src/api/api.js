import { noFilter } from '../constants'

const url = "http://localhost:8080/tweets"

export function getTweetsByType(type, selectedLang) {
  const langAppend = selectedLang === noFilter ? '' : selectedLang

  let fullUrl = `${url}?type=${type}`

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