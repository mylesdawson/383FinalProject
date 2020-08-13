import React, { useState, useCallback } from 'react';

import { getTweetsByType } from './api/api'

function AppContainer() {
  const [ isSending, setIsSending ] = useState(false)
  const [ tweet, setTweet ] = useState('')
  const [ data, setData ] = useState(null)
  const [ apiErr, setApiErr ] = useState('')
  const [ tweets, setTweets ] = useState([])


  const sendReq = useCallback(async (e) => {
    e.preventDefault()
    if (isSending) {
      return
    }

    setIsSending(true)
    setApiErr('')
    setTweet([])

    try {
      const res = await getTweetsByType(tweet)
      console.log(res)
      setData(res.statuses)
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
    <div className="container">
      <form class="main-form">
        <label htmlFor="mainInput">Search for a Tweet by Keyword</label>
        <div className="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend">#</span>
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            id="mainInput"
            className="form-control"
            aria-describedby="inputGroupPrepend"
            onChange={inputChange}
            required />
        </div>
        <div class="text-danger">
          { apiErr }
        </div>
        <button className="btn btn-primary" onClick={sendReq}>Find Tweets</button>
      </form>
    </div>
  );
}

export default AppContainer;
