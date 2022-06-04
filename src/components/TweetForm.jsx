import React, { useState } from 'react';
import { BeakerIcon } from '@heroicons/react/solid';

const MAX_TWEET_CHA = 250;
function TweetForm() {
  const [tweet, setTweet] = useState('');
  const [tweetMax, setTweetMax] = useState(false);

  const handleText = ({ target: { value } }) => {
    if (tweet.length >= MAX_TWEET_CHA) setTweetMax(true);
    if (tweet.length < MAX_TWEET_CHA) setTweetMax(false);
    setTweet(value);
  };
  return (
    <div className="border-b border-silver p-4 space-y-6">
      <header className="flex space-x-5 ">
        <BeakerIcon className="h-5 w-5 text-blue-500" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </header>
      <form className="pl-12 text-lg flex flex-col ">
        <textarea
          value={tweet}
          placeholder="O que está acontecendo?"
          name="tweet"
          className="bg-transparent outline-none disabled:opacity-50"
          onChange={handleText}
        />
        <div className="flex justify-end items-center space-x-3">
          <p className="text-sm">
            {tweet.length}/
            <span className={tweetMax ? 'text-red-500' : 'text-birdBlue'}>{MAX_TWEET_CHA}</span>
          </p>
          <button
            disabled={tweetMax}
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

export default TweetForm;
