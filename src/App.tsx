import { useCallback, useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { usePreventResizeOnTouch } from './hooks/usePreventResizeOnTouch';
import { useModal } from './hooks/useModal';
import SettingsModal from './components/SettingsModal';
import { useMusicContext } from './context/MusicContext/hooks';
import { lettersList, numbersList } from './handlers';
import BallonsList from './components/BallonsList';

function App() {
  const [isNumbers, setIsNumbers] = useState(false);

  const onButtonClick = useCallback(() => {
    setIsNumbers(prev => !prev);
  }, []);

  usePreventResizeOnTouch();

  const { isOpen, openPopup, closePopup } = useModal();
  const { audioRef } = useMusicContext();

  return (
    <div className={`container ${isNumbers ? 'numbers' : ''}`} translate="no">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}/instrumental.mp3`} loop />
      <div className={`main-buttons-container ${isNumbers ? 'main-buttons-container--low' : ''}`}>
        <Button
          type="button"
          onClick={openPopup}
          text="НАСТРОЙКИ"
          translate="no"
        />
        <SettingsModal
          isOpen={isOpen}
          onClose={closePopup}
          isNumbers={isNumbers}
          onButtonClick={onButtonClick}
        />
      </div>
      <div className="main" />
      <BallonsList type={isNumbers ? 'round' : ''} list={isNumbers ? numbersList : lettersList} />
    </div>
  );
}

export default App;
