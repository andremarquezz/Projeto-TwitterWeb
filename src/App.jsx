import React from 'react';
import Tweet from './components/Tweet';
import TweetForm from './components/TweetForm';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Login/>
      <TweetForm />
      <Tweet name="brabo" username="asd" />
      <Tweet name="outro" username="brabo" />
    </>
  );
}

export default App;
