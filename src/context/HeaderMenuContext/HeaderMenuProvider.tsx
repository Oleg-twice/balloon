import { ReactNode, useCallback, useMemo } from "react";
import { useModal } from "@/hooks/useModal";
import { HeaderHandlersContext, HeaderMenuContext } from "./HeaderMenuContext";
import { usePlaySound } from "@/hooks/usePlaySound";
import { pipe } from "@/handlers";
import { useSteps } from "@/hooks/useSeteps";

const MENU_ITEMS = {
    LETTERS: 'LETTERS',
    NUMBERS: 'NUMBERS',
    PLANETS: 'PLANETS'
};

const MENU_ITEMS_LIST = Object.values(MENU_ITEMS);

export const HeaderMenuProvider = ({ children }: { children: ReactNode }) => {
    const [currentView, openLettersView, openNumbersView] = useSteps(MENU_ITEMS_LIST)
    const { handleSound } = usePlaySound(`${import.meta.env.BASE_URL}/click.mp3`);
    const { handleSound: handleCloseSound } = usePlaySound(`${import.meta.env.BASE_URL}/close-click.mp3`);

    const { isOpen: isPopupMenuOpen, openPopup: openSettingsPopup, closePopup: closeSettingsPopup } = useModal();
    const {
        isOpen: isHeaderOpen,
        openPopup: openHeader,
        closePopup: closeHeader
    } = useModal();

    const headerMenuValues = useMemo(() => ({
        isHeaderOpen,
        isPopupMenuOpen,
        isNumbers: currentView === MENU_ITEMS.NUMBERS
    }), [currentView, isHeaderOpen, isPopupMenuOpen]);

    const toggleHeader = useCallback(() => {
        handleSound();
        if (isHeaderOpen) {
            closeHeader();
            return;
        }

        openHeader();
    }, [closeHeader, handleSound, isHeaderOpen, openHeader]);

    const headerMenuHandlers = useMemo(() => ({
        openSettingsPopup: pipe(handleSound, openSettingsPopup),
        closeSettingsPopup: pipe(handleCloseSound, closeSettingsPopup),
        openHeader,
        closeHeader,
        toggleHeader,
        openLettersView,
        openNumbersView,
    }), [closeHeader, closeSettingsPopup, handleCloseSound, handleSound, openHeader, openLettersView, openNumbersView, openSettingsPopup, toggleHeader])

    return (
        <HeaderMenuContext.Provider value={headerMenuValues}>
            <HeaderHandlersContext.Provider value={headerMenuHandlers}>
                {children}
            </HeaderHandlersContext.Provider>
        </HeaderMenuContext.Provider>
    );
};
