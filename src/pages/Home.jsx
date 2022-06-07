import Tweet from '../components/Tweet';
import axios from 'axios';
import TweetForm from '../components/TweetForm';
import { useEffect, useState } from 'react';
import avatar from '../avatar.png';

function Home({ user }) {
  const [data, setData] = useState('');

  const getData = async () => {
    const res = await axios.get('http://localhost:9901/tweets', {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <>
      <TweetForm user={user} onSuccess={getData} />
      <div>
        {data.length &&
          data.map((tweet) => (
            <Tweet
              key={tweet.id}
              name={tweet.user.name}
              username={tweet.user.username}
              avatar={avatar}
            >
              {tweet.text}
            </Tweet>
          ))}
      </div>
    </>
  );
}

export default Home;
