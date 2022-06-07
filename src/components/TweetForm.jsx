import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import avatar from '../avatar.png';

const MAX_TWEET_CHA = 250;

function TweetForm({ user, onSuccess }) {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: 'http://localhost:9901/tweets',
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
        data: {
          text: values.text,
        },
      });

      form.setFieldValue('text', '');
      onSuccess();
    },
    initialValues: {
      text: '',
    },
  });

  const [tweetMax, setTweetMax] = useState(false);

  const handleText = (event) => {
    const {
      values: { text },
      handleChange,
    } = formik;
    handleChange(event);
    if (text.length >= MAX_TWEET_CHA) setTweetMax(true);
    if (text.length < MAX_TWEET_CHA) setTweetMax(false);
  };

  const {
    handleSubmit,
    values: { text },
    handleBlur,
    isSubmitting,
  } = formik;

  return (
    <div className="border-b border-silver p-4 space-y-6">
      <header className="flex space-x-5 ">
        <img src={avatar} alt="avatar" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </header>
      <form className="pl-12 text-lg flex flex-col" onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={text}
          placeholder="O que está acontecendo?"
          className="bg-transparent outline-none disabled:opacity-50"
          onChange={handleText}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        <div className="flex justify-end items-center space-x-3">
          <p className="text-sm">
            {text.length}/
            <span className={tweetMax ? 'text-red-500' : 'text-birdBlue'}>
              {MAX_TWEET_CHA}
            </span>
          </p>
          <button
            type="submit"
            disabled={tweetMax || isSubmitting}
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

export default TweetForm;
