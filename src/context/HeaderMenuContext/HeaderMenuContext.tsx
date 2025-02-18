import { createContext } from 'react';

type HeaderContextType = {
    isHeaderOpen: boolean;
    isPopupMenuOpen: boolean;
    isNumbers: boolean;
    currentView: string;
};
type HeaderHandlersType = {
    openSettingsPopup: (arg?: string) => string | undefined;
    closeSettingsPopup: (arg?: string) => string | undefined;
    openHeader: () => void;
    closeHeader: () => void;
    toggleHeader: () => void;
    openLettersView: () => void;
    openNumbersView: () => void;
    openPlanetsView: () => void;
};

export const HeaderMenuContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderHandlersContext = createContext<HeaderHandlersType | undefined>(undefined);
