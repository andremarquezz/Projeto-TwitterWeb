import Login from './pages/Login';
import { useState } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [user, setUser] = useState();

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/signup" element={<Signup signInUser={setUser} />} />
        <Route path="/" element={<Login signInUser={setUser} user={user} />} />
      </Routes>
    </>
  );
}

export default App;
