import Tweet from '../components/Tweet';
import axios from 'axios';
import TweetForm from '../components/TweetForm';
import { useEffect, useState } from 'react';

function Home() {
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbDQzcGtjODAwMDA4cm85YmZla3BvdnJqIiwiaWF0IjoxNjU0NTc4OTEzLCJleHAiOjE2NTQ2NjUzMTN9.uwRWt1dkossx89s2R9l7G7DXg1axlrzFKlmOGfMzQt0';

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get('http://localhost:9901/tweets', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    setData(data);
  };
  return (
    <>
      <TweetForm />
      {data.length &&
        data.map(({ user }) => {
          <Tweet name={user.name} username={user.username} avatar={'#'} />;
        })}
    </>
  );
}

export default Home;
