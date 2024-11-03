import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { MusicContext, MusicHandlersContext } from './MusicContext';

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

    const toggleMusic = useCallback(() => {
        setIsPlaying((prev) => !prev);
    }, []);

    const onVolumeChange = useCallback((n: number) => {
        setVolume(n);
    }, []);

    return (
        <MusicContext.Provider value={{ audioRef, volume, isPlaying }}>
            <MusicHandlersContext.Provider value={{ toggleMusic, onVolumeChange }}>
                {children}
            </MusicHandlersContext.Provider>
        </MusicContext.Provider>
    )
};