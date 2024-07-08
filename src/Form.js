import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './index.css';

const Form = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailLink, setThumbnailLink] = useState('');

  useEffect(() => {
    if (validateUrl(videoUrl)) {
      displayThumbnail(videoUrl);
    } else {
      removeThumbnail();
    }
  }, [videoUrl]);

  const validateUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.*$', 'i');
    if (!pattern.test(url)) {
      return false;
    }
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    if (urlObj.hostname === 'youtu.be') {
      return true; // youtu.be short link is valid if it reaches here
    }
    return urlObj.hostname === 'www.youtube.com' && params.has('v');
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const extractVideoId = (url) => {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    const params = new URLSearchParams(urlObj.search);
    return params.get('v');
  };

  const displayThumbnail = (videoUrl) => {
    const videoId = extractVideoId(videoUrl);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    const thumbnailLink = `https://www.youtube.com/watch?v=${videoId}`;

    setThumbnailUrl(thumbnailUrl);
    setThumbnailLink(thumbnailLink);
  };

  const removeThumbnail = () => {
    setThumbnailUrl('');
    setThumbnailLink('');
    setVideoUrl('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUrl(videoUrl) && validateEmail(email)) {
      Swal.fire({
        icon: 'success',
        title: 'Zionotes Generation Underway',
        text: 'Check your email in a few minutes to view your personalized Zionotes PDF and video player',
      });
      console.log(`YouTube URL: ${videoUrl}`);
      console.log(`Email: ${email}`);
      // Perform your submission actions here
    } else {
      let errorMessage = '';

      if (!validateUrl(videoUrl) && !validateEmail(email)) {
        errorMessage = 'Both the URL and email inputs are invalid.';
      } else if (!validateUrl(videoUrl)) {
        errorMessage = 'The URL input is invalid.';
      } else if (!validateEmail(email)) {
        errorMessage = 'The email input is invalid.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  };

  return (
    <div className="container">
      <img src={`${process.env.PUBLIC_URL}/ZioNotes Logo w Tagline.png`} alt="ZioNotes Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="video-url">YouTube Video URL:</label>
          <input
            type="text"
            id="video-url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        {thumbnailUrl && (
          <div>
            <a href={thumbnailLink} target="_blank" rel="noopener noreferrer">
              <img id="video-thumbnail" src={thumbnailUrl} alt="YouTube Video Thumbnail" style={{ maxWidth: '100%' }} />
            </a>
            <button
              type="button"
              id="undo-button"
              onClick={() => {
                removeThumbnail();
                setVideoUrl('');
              }}
              style={{
                display: 'block',
                margin: '10px auto',
                textAlign: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#FFFF00',
                fontSize: '24px'
              }}
            >
              <i className="fas fa-undo-alt" style={{ fontSize: '24px', color: '#FFFF00' }}></i>
            </button>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
