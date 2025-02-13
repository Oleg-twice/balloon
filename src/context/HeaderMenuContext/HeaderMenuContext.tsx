import { createContext } from 'react';

type HeaderContextType = {
    isHeaderOpen: boolean;
    isPopupMenuOpen: boolean;
    isNumbers: boolean
};
type HeaderHandlersType = {
    chooseBallonTypeClick: () => void;
    openSettingsPopup: () => void;
    closeSettingsPopup: () => void;
    openHeader: () => void;
    closeHeader: () => void;
    toggleHeader: () => void;
};

export const HeaderMenuContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderHandlersContext = createContext<HeaderHandlersType | undefined>(undefined);
