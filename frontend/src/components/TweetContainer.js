import React, { useState, useCallback } from 'react'

import Tweet from './Tweet'

import { getTweetsByType } from '../api/api'
import { supportedLanguages } from '../constants/constants'

export default function TweetContainer() {
  const [ isSending, setIsSending ] = useState(false)
  const [ tweet, setTweet ] = useState('')
  const [ apiErr, setApiErr ] = useState('')
  const [ tweets, setTweets ] = useState([])

  const sendReq = useCallback(async (e) => {
    e.preventDefault()
    if (isSending) {
      return
    }

    setIsSending(true)
    setApiErr('')
    setTweets([])

    try {
      const selectedLang = document.getElementById("languageSelect").value

      const res = await getTweetsByType(tweet, selectedLang)
      console.log(res)
      setTweets(res.statuses)
    } catch (error) {
      console.error(error)
      setApiErr(error.message)
    } finally {
      setIsSending(false)
    }
  }, [isSending, tweet])

  const inputChange = (e) => {
    e.preventDefault()
    setTweet(e.target.value)
  }

  return (
    <div>
      <form className="main-form">
        <label htmlFor="mainInput">Search for a Tweet by Keyword</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupPrepend">#</span>
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            id="mainInput"
            className="form-control"
            aria-describedby="inputGroupPrepend"
            onChange={inputChange}
            value={tweet}
            required />
        </div>
        <div className="text-danger">
          {apiErr}
        </div>

        <label htmlFor="languageSelect">(Optional) Filter by Language</label>
        <div className="input-group">
          <select id="languageSelect" className="custom-select">
            {supportedLanguages.map(lang =>
              <option key={lang} value={lang}>{lang}</option>
            )}
          </select>
        </div>

        <div className="input-group">
          <button className="btn btn-outline-success" onClick={sendReq}>Find Tweets</button>
        </div>
      </form>

      <div className="card-container">
        {tweets.map(tweet =>
          <Tweet
            key={tweet.id}
            tweet={tweet}
          />
        )}
      </div>
    </div>
  )
}
