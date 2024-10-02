import React, { ChangeEvent, useCallback, memo } from 'react';
import './VolumeControl.css';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  const handleChange = useCallback(
    (e: ChangeEvent) => onVolumeChange(parseFloat((e.target as any).value)
  ), [onVolumeChange]);

  return (
    <div className="volumeControl">
      <label htmlFor="volume">Громкость:</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="0.2"
        step="0.01"
        value={volume}
        onChange={handleChange}
      />
    </div>
  );
};

export default memo(VolumeControl);
