import { createContext, MutableRefObject } from 'react';

type MusicContextType = {
  isPlaying: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  volume: number;
}

type MusicHandlersTypes = {
  toggleMusic: () => void;
  onVolumeChange: (n: number) => void;
}

export const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicHandlersContext = createContext<MusicHandlersTypes | undefined>(undefined)
