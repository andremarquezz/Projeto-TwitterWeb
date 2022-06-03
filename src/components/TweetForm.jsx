import React, { useState } from 'react';
import { BeakerIcon } from '@heroicons/react/solid';

function TweetForm() {
  const [tweet, setTweet] = useState('');
  const [tweetMax, setTweetMax] = useState(false);

  const handleText = ({ target: { value } }) => {
    // const maxCaracters = 250;
    // if (tweet.length === maxCaracters) {
    //   console.log('entrei');
    //   setTweetMax(true);
    //   return;
    // } else {
    //   setTweetMax(false);
    // }
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
          className="bg-transparent outline-none"
          onChange={handleText}
        />
        <div className="flex justify-end items-center space-x-3">
          <p className="text-sm" onChange={handleText}>
            {tweet.length}/<span className={tweetMax ? 'text-red-500' : 'text-birdBlue'}>250</span>
          </p>
          <button className="bg-birdBlue px-5 py-2 rounded-full">Tweet</button>
        </div>
      </form>
    </div>
  );
}

export default TweetForm;
