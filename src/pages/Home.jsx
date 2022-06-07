import Tweet from '../components/Tweet';
import axios from 'axios';
import TweetForm from '../components/TweetForm';
import { useEffect, useState } from 'react';
import avatar from '../avatar.png';

function Home({ user }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    });
    setData(data);
  };
  return (
    <>
      <TweetForm user={user} onSuccess={fetchData} />
      {data.length &&
        data.map(({ user }) => {
          <Tweet key={user.id} name={user.name} username={user.username} avatar={avatar} />;
        })}
    </>
  );
}

export default Home;
