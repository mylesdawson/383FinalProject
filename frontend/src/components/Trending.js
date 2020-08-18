import React from 'react'

export default function Trending({ trend }) {
  const volume = trend.tweet_volume

  return (
    volume
    ?
    <div className="card">
      <div className="card-body">
        <h3>{trend.name}</h3>
        <div>
          <p>
            {volume} tweets in the past 24 hours
          </p>
          <a href={trend.url}>{trend.url}</a>
        </div>
      </div>
    </div>
    :
    null
  )
}
