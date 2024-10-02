import { useState, useCallback, memo } from 'react';
import './Balloon.css';

type BallonProps = {
  onClick: (letter: string) => void;
  letter: string;
  color: string;
  type?: string;
  className: string;
};

interface CustomStyle extends React.CSSProperties {
  '--x'?: string;
  '--y'?: string;
}

export const Balloon = memo(({ onClick, letter, color = 'orange', type = '', className }: BallonProps) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = useCallback(() => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000); // Reset after 1 second
    onClick(letter);
  }, [onClick, letter]);

  const balloonClasses = `balloon balloon--${color} ${type}`;

  return (
    <div className={`balloon-container ${className}`} onClick={handleClick}>
      <div className={balloonClasses}>{letter}</div>
      {animate && (
        <>
          <div
            className="small-balloon"
            style={{
              '--x': '70px',
              '--y': '-70px',
              animation: 'firework 1s forwards',
            } as CustomStyle}
          ></div>
          <div
            className="small-balloon"
            style={{
              '--x': '-70px',
              '--y': '70px',
              animation: 'firework 1s forwards',
            } as CustomStyle}
          ></div>
          <div
            className="small-balloon"
            style={{
              '--x': '70px',
              '--y': '70px',
              animation: 'firework 1s forwards',
              background: 'rose',
            } as CustomStyle}
          ></div>
          <div
            className="small-balloon"
            style={{
              '--x': '-70px',
              '--y': '-70px',
              animation: 'firework 1s forwards',
              background: 'green',
            } as CustomStyle}
          ></div>
          <div
            className="small-balloon"
            style={{
              '--x': '-70px',
              '--y': '0',
              animation: 'firework 1s forwards',
              background: 'orange',
            } as CustomStyle}
          ></div>
          <div
            className="small-balloon"
            style={{
              '--x': '70px',
              '--y': '0',
              animation: 'firework 1s forwards',
              background: 'pink',
            } as CustomStyle}
          ></div>
          <div
            className="small-balloon"
            style={{
              '--x': '0',
              '--y': '-70px',
              animation: 'firework 1s forwards',
              background: 'orange',
            } as CustomStyle}
          ></div>
          <div
            className="small-balloon"
            style={{
              '--x': '0',
              '--y': '70',
              animation: 'firework 1s forwards',
              background: 'pink',
            } as CustomStyle}
          ></div>
        </>
      )}
    </div>
  );
});
