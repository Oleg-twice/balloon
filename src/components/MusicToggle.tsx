import React, { useState, useEffect, useRef, memo } from 'react';
import VolumeControl from './VolumeControl';
import './MusicToggle.css';

const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.05);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}/instrumental.mp3`} loop />

      <button 
        onClick={toggleMusic} 
        className={`toggle-button ${isPlaying ? 'playing': ''}`}
      >
        <span className="icon">{isPlaying ? '🔊' : '🔈'}</span>
        {isPlaying ? 'Выключить музыку' : 'Включить музыку'}
      </button>

      <VolumeControl volume={volume} onVolumeChange={setVolume} />
    </div>
  );
};

export default memo(MusicToggle);
