import { useCallback, useMemo, useRef } from 'react';
import './App.css';
import { usePreventResizeOnTouch } from '@/hooks/usePreventResizeOnTouch';
import { useMusicContext } from '@/context/MusicContext/hooks';
import { lettersList, numbersList } from '@/handlers';
import Slider from '@/components/Slider/Slider';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Header } from '@/components/Header';
import { useHeaderMenuContext } from './context/HeaderMenuContext/hooks';

function App() {
  const { isNumbers, isHeaderOpen } = useHeaderMenuContext();

  usePreventResizeOnTouch();

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
        return isNumbers ? 2 : 3;
      }

      return isNumbers ? 1 : 2;
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
    <div className={`container ${isNumbers ? 'numbers' : ''}${isHeaderOpen ? ' container-padding-top': ''}`} translate="no">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}/instrumental.mp3`} loop />
      <audio ref={voiceRef} />
      <Header />
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
