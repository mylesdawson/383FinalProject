import React, { useState, useCallback } from 'react'

import Trending from './Trending'

import { getTrendsByPlace } from '../api/api'
import { supportedLocations } from '../constants/constants'

export default function TrendingContainer() {
  const [ isSending, setIsSending ] = useState(false)
  const [ trends, setTrends ] = useState([])


  const locations = supportedLocations.map(loc =>
    <option key={loc[0]} value={loc[0]}>{loc[1]}</option>
  )

  const sendReq = useCallback(async (e) => {
    e.preventDefault()

    if(isSending) return

    setIsSending(true)
    setTrends([])

    try {
      const selectedLocation = document.getElementById("location").value
      const res = await getTrendsByPlace(selectedLocation)
      setTrends(res[0].trends)
      console.log(res[0].trends)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSending(false)
    }

  }, [isSending])

  return (
    <div>
      <form>
        <label htmlFor="location">Choose a Location</label>
        <div className="input-group">
          <select id="location" className="custom-select">
            {locations}
          </select>
        </div>

        <div className="input-group">
          <button className="btn btn-outline-success" onClick={sendReq}>
            Get Trending Tweets
          </button>
        </div>
      </form>

      <div className="card-container">
        {trends.map((trend, ind) =>
          <Trending key={ind} trend={trend}/>)}
      </div>
    </div>
  )
}
