const url = "http://localhost:8080/tweets"

export function getTweetsByType(type) {
  const fullUrl = `${url}?type=${type}`

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