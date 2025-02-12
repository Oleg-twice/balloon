import { useCallback, useMemo, useRef, useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { usePreventResizeOnTouch } from './hooks/usePreventResizeOnTouch';
import { useModal } from './hooks/useModal';
import SettingsModal from './components/SettingsModal';
import { useMusicContext } from './context/MusicContext/hooks';
import { lettersList, numbersList } from './handlers';
import Slider from './components/Slider';
import { useMediaQuery } from './hooks/useMediaQuery';
import FullscreenButton from './components/FullscreenButton';

function App() {
  const [isNumbers, setIsNumbers] = useState(false);

  const onButtonClick = useCallback(() => {
    setIsNumbers(prev => !prev);
  }, []);

  usePreventResizeOnTouch();

  const { isOpen, openPopup, closePopup } = useModal();
  const { audioRef } = useMusicContext();

  // TODO: Put this logic in separate hook
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  const handleSayOnClick = useCallback((letter: string) => {
    if (!voiceRef?.current) return;

    voiceRef.current.src = `${import.meta.env.BASE_URL}${isNumbers ? 'numbers' : 'letters'}/${letter}.mp3`;
    voiceRef.current.play();
  }, [isNumbers]);

  const [isMobile, , , isLandscape] = useMediaQuery();

  const columns = useMemo(() => {
    if (isMobile) {
      if (isLandscape) {
        return 2;
      }

      return 1;
    }

    if (!isLandscape) {
      if (isNumbers) {
        return 3
      }

      return 4;
    }

    return isNumbers ? 4 : 5;
  }, [isLandscape, isMobile, isNumbers]);

  return (
    <div className={`container ${isNumbers ? 'numbers' : ''}`} translate="no">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}/instrumental.mp3`} loop />
      <audio ref={voiceRef} />
      <div className={`main-buttons-container ${isNumbers ? 'main-buttons-container--low' : ''}`}>
        <Button
          type="button"
          onClick={openPopup}
          text="НАСТРОЙКИ"
          translate="no"
        />
        <FullscreenButton />
        <SettingsModal
          isOpen={isOpen}
          onClose={closePopup}
          isNumbers={isNumbers}
          onButtonClick={onButtonClick}
        />
      </div>
      <div className="main" />
      <Slider
        items={isNumbers ? numbersList : lettersList}
        handleSayOnClick={handleSayOnClick}
        ballonListType={isNumbers ? 'round' : ''}
        columns={columns}
        visibleCount={isNumbers ? 10 : 15}
      />

    </div>
  );
}

export default App;
