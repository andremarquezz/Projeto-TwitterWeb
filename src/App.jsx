import React from 'react';
import Tweet from './components/Tweet';
import TweetForm from './components/TweetForm';

function App() {
  return (
    <>
      <TweetForm />
      <Tweet name="brabo" username="asd" />
      <Tweet name="outro" username="brabo" />
    </>
  );
}

export default App;
