import './App.css';
import { usePreventResizeOnTouch } from '@/hooks/usePreventResizeOnTouch';
import { useMusicContext } from '@/context/MusicContext/hooks';
import { Header } from '@/components/Header';
import { useHeaderMenuContext } from './context/HeaderMenuContext/hooks';
import { BallonsPage } from './pages/Balloons';
import { MENU_ITEMS } from './context/HeaderMenuContext/constants';
import Planets from './pages/Planets/Planets';

function App() {
  const { isNumbers, isHeaderOpen, currentView } = useHeaderMenuContext();

  usePreventResizeOnTouch();

  const { audioRef } = useMusicContext();

  return (
    <div className={`container ${isNumbers ? 'numbers' : ''}${isHeaderOpen ? ' container-padding-top': ''}`} translate="no">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}/instrumental.mp3`} loop />
      <Header />
      <div className="main" />
        {currentView === MENU_ITEMS.PLANETS ? <Planets /> : <BallonsPage />}
    </div>
  );
}

export default App;
