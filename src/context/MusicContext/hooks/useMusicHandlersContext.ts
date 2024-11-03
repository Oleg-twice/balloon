import { useContext } from 'react';
import { MusicHandlersContext } from '../MusicContext';

export const useMusicHandlersContext = () => {
    const context = useContext(MusicHandlersContext);

    if (!context) {
        throw new Error('useMusicHandlersContext must be used within a MusicProvider');
    }

    return context;
}
