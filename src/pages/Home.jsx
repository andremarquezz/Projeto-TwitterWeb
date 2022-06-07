import Tweet from '../components/Tweet';
import axios from 'axios';
import TweetForm from '../components/TweetForm';
import { useEffect, useState } from 'react';
import avatar from '../avatar.png';

function Home({ user }) {
  const [data, setData] = useState('');

  const getData = async () => {
    const { data } = await axios.get('http://localhost:9901/tweets', {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    });
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TweetForm user={user} onSuccess={getData} />
      <div>
        {data.length &&
          data.map(({ id, user, text }) => (
            <Tweet
              key={id}
              name={user.name}
              username={user.username}
              avatar={avatar}
            >
              {text}
            </Tweet>
          ))}
      </div>
    </>
  );
}

export default Home;
