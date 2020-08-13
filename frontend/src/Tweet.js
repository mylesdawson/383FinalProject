import React from 'react'

export default function Tweet({ tweet }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-user">
          <img src={tweet.user.profile_image_url} alt="Card image cap" className="tweet-image"></img>
          <h5>{tweet.user.name}</h5>
        </div>
        <p className="card-text">{ tweet.full_text }</p>
        {/* <h5 className="card-title">{ tweet.created_at }</h5> */}
      </div>
    </div>
  )
}
