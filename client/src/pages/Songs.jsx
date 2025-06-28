// src/pages/Songs.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Songs.css';

const Songs = () => {
  const { era: routeEra } = useParams();
  const era = routeEra || 'folklore';

  const navigate = useNavigate();

  const toggleEra = era === 'folklore' ? 'evermore' : 'folklore';

  const songs = era === 'folklore'
    ? [
        { title: 'The 1', spotifyId: '0Jlcvv8IykzHaSmj49uNW8' },
        { title: 'Betty', spotifyId: '5kI4eCXXzyuIUXjQra0Cxi' },
        { title: 'Cardigan', spotifyId: '4R2kfaDFhslZEMJqAFNpdd' },
        { title: 'Exile (feat. Bon Iver)', spotifyId: '4pvb0WLRcMtbPGmtejJJ6y' },
        { title: 'My Tears Ricochet', spotifyId: '1MgV7FIyNxIG7WzMRJV5HC' },
        { title: 'Mirrorball', spotifyId: '0ZNU020wNYvgW84iljPkPP' },
        { title: 'August', spotifyId: '3hUxzQpSfdDqwM3ZTFQY0K' },
        { title: 'This Is Me Trying', spotifyId: '7kt9e9LFSpN1zQtYEl19o1' },
        { title: 'Illicit Affairs', spotifyId: '2NmsngXHeC1GQ9wWrzhOMf' },
        { title: 'Invisible String', spotifyId: '6VsvKPJ4xjVNKpI8VVZ3SV' },
        { title: 'Mad Woman', spotifyId: '2QDyYdZyhlP2fp79KZX8Bi' },
        { title: 'Epiphany', spotifyId: '08fa9LFcFBTcilB3iq2e2A' },
        { title: 'Peace', spotifyId: '7MbT4I8qGntX4fMdqMQgke' },
        { title: 'Hoax', spotifyId: '6MWoRt97mnSTXZhu3ggi9C' }

      ]
    : [
        { title: 'Willow', spotifyId: '2gVhfX2Gy1T9kDuS9azrF7' },
        { title: 'Champagne Problems', spotifyId: '0sY6ZUTh4yoctD8VIXz339' },
        { title: 'Gold Rush', spotifyId: '5BK0uqwY9DNfZ630STAEaq' },
        { title: 'Tolerate It', spotifyId: '6lCvK2AR2uOKkVFCVlAzzm' },
        { title: 'Ivy', spotifyId: '43Ykum9T72UOPhBN31grpN' },
        { title: 'Cowboy Like Me', spotifyId: '52OkpDsU6MmPx1AwGOb6Ap' },
        { title: '’Tis the Damn Season', spotifyId: '6sQckd3Z8NPxVVKUnavY1F' },
        { title: 'No Body No Crime(feat HAIM)', spotifyId: '6uwfVkaOM1mcMkFmSn35ix' },
        { title: 'Happiness', spotifyId: '55Vf4bimc1Rtfg0PAQRAo2' },
        { title: 'Dorothea', spotifyId: '66tOfHVH3aUrscg8vExRV4' },
        { title: 'Coney Island(feat The National)', spotifyId: '2awNGIJHodfLZSClB3PYhz' },
        { title: 'Long Story Short', spotifyId: '5VYWxXUpxuxEmCqMLDqICo' },
        { title: 'Marjorie', spotifyId: '5uICWmZTLkpEVbK22PBP6e' },
        { title: 'Closure', spotifyId: '6a8aUhYbaQBUI8PcJ5ZmQ6' },
        { title: 'Evermore(feat Bon Iver)', spotifyId: '6Wlq9rqkxrqj5Kls4Kw14H' },
        { title: 'Right Where You Left Me', spotifyId: '3zwMVvkBe2qIKDObWgXw4N' },
        { title: 'It’s Time to Go', spotifyId: '1kdWw77ZpYOkhxeuhzU1j6' }
      ];

  return (
    <div className="songs-page">
      <h2>{era.charAt(0).toUpperCase() + era.slice(1)} Songs</h2>

      <button 
        onClick={() => navigate(`/songs/${toggleEra}`)} 
        className="toggle-era-button"
      >
      Switch to {toggleEra.charAt(0).toUpperCase() + toggleEra.slice(1)}
      </button>


      <div className="songs-container">
        {songs.map((song, index) => (
          <div key={index} className="song-item" style={{ marginBottom: '20px' }}>
            <h3>{song.title}</h3>
            <iframe
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator`}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`Spotify player for ${song.title}`}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Songs;
