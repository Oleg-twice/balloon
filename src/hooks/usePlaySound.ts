import { useEffect, useRef, useCallback, useState } from 'react';


//`${import.meta.env.BASE_URL}/missle.mp3`
export const usePlaySound = (soundSrc: string) => {
    const soundRef = useRef<HTMLAudioElement | null>(null);
    const [isAudioAllowed, setIsAudioAllowed] = useState(false);
    
    const handleSound = useCallback(() => {
        if (!soundRef?.current || !isAudioAllowed) return;

        soundRef.current.currentTime = 0;
        soundRef.current.play().catch(() => {
            setTimeout(() => {
                if (isAudioAllowed) {
                    soundRef.current?.play();
                }
            }, 50)
        });
    }, [isAudioAllowed]);

    useEffect(() => {
        soundRef.current = new Audio(soundSrc);
        soundRef.current.volume = 0.4;
        
        const enableAudio = () => {
            setIsAudioAllowed(true);
            window.removeEventListener('click', enableAudio);
            window.removeEventListener('touchstart', enableAudio);
        }

        window.addEventListener('click', enableAudio, { once: true });
        window.addEventListener('touchstart', enableAudio, { once: true });

        return () => {
            window.removeEventListener('click', enableAudio);
            window.removeEventListener('touchstart', enableAudio);
        };
    }, [soundSrc]);

    return {
        handleSound,
        soundRef
    }
}
