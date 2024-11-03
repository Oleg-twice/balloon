import React, { memo } from 'react';
import { useMusicHandlersContext, useMusicContext } from '../context/MusicContext/hooks';
import VolumeControl from './VolumeControl';
import './MusicToggle.css';

const MusicToggle: React.FC = () => {
  const { isPlaying, volume } = useMusicContext();
  const { toggleMusic, onVolumeChange } = useMusicHandlersContext();

  return (
    <div className="music-toggle-container">
      <button 
        onClick={toggleMusic} 
        className={`toggle-button ${isPlaying ? 'playing': ''}`}
      >
        <span className="icon">{isPlaying ? '🔊' : '🔈'}</span>
        {isPlaying ? 'ВЫКЛЮЧИТЬ МУЗЫКУ' : 'ВКЛЮЧИТЬ МУЗЫКУ'}
      </button>

      <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
    </div>
  );
};

export default memo(MusicToggle);
