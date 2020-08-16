import React from 'react'

export default function Tweet({ tweet }) {

  // TODO extract all this to a separate file and maybe parse it before passing it into a Tweet component
  const tweetArr = tweet.full_text.split(" ")

  const containsHTTPText = (str) => {
    return str.indexOf("http") > -1
  }

  let tweetText = tweetArr.filter(val => val.indexOf("http") === -1)
  tweetText = tweetText.join(" ")
  let links = tweetArr.filter(containsHTTPText)
  links = links.map((val, ind) => {
    let arrVal = val.split("\n")
    let actualLink = arrVal.filter(containsHTTPText)
    return actualLink
  })

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-user">
          <img src={tweet.user.profile_image_url} alt="Card image cap" className="tweet-image"></img>
          <h5>{tweet.user.name}</h5>
        </div>
        <p className="card-text">{ tweetText }</p>
        {
          links.map(link => {
            return (
              <div
                key={link}
              >
                <a href={link}>{link}</a>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
