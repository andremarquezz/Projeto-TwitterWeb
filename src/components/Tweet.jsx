import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';

function Tweet({ name, avatar, username, children }) {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={avatar} alt="Avatar User" />
      </div>
      <div>
        <span className="font-bold text-sm">{name}</span>
        <span className="text-sm text-silver">@{username}</span>

        <p>{children}</p>
        <HeartIcon className="w-6 stroke-1" />
      </div>
    </div>
  );
}

export default Tweet;
