import { useState, useCallback } from 'react';

export const useModal = (callback?: () => void) => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closePopup = useCallback(() => {
        setIsOpen(false);

        if (callback) {
            callback();
        }
    }, [callback]);

    return {
        isOpen,
        openPopup,
        closePopup
    }
};
