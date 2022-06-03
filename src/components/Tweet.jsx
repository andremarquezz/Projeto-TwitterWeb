import React from 'react';

function Tweet({ name, avatar, username }) {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={avatar} alt="Avatar User" />
      </div>
      <div>
        <span>{name}</span>
        <span>@{username}</span>
        <p>Vamo qVamo</p>
      </div>
    </div>
  );
}

export default Tweet;
