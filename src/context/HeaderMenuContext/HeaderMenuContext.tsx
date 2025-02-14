import { createContext } from 'react';

type HeaderContextType = {
    isHeaderOpen: boolean;
    isPopupMenuOpen: boolean;
    isNumbers: boolean
};
type HeaderHandlersType = {
    openSettingsPopup: () => void;
    closeSettingsPopup: () => void;
    openHeader: () => void;
    closeHeader: () => void;
    toggleHeader: () => void;
    openLettersView: () => void;
    openNumbersView: () => void
};

export const HeaderMenuContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderHandlersContext = createContext<HeaderHandlersType | undefined>(undefined);
