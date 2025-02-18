import { ReactNode, useCallback, useMemo } from "react";
import { useModal } from "@/hooks/useModal";
import { HeaderHandlersContext, HeaderMenuContext } from "./HeaderMenuContext";
import { usePlaySound } from "@/hooks/usePlaySound";
import { pipe } from "@/handlers";
import { useSteps } from "@/hooks/useSeteps";
import { MENU_ITEMS, MENU_ITEMS_LIST } from "./constants";

export const HeaderMenuProvider = ({ children }: { children: ReactNode }) => {
    const [currentView, openLettersView, openNumbersView, openPlanetsView] = useSteps(MENU_ITEMS_LIST)
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
        isNumbers: currentView === MENU_ITEMS.NUMBERS,
        currentView
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
        openSettingsPopup: pipe(handleSound as (arg?: string) => string | undefined, openSettingsPopup as (arg?: string) => string | undefined),
        closeSettingsPopup: pipe(handleCloseSound as (arg?: string) => string | undefined, closeSettingsPopup as (arg?: string) => string | undefined),
        openHeader,
        closeHeader,
        toggleHeader,
        openLettersView,
        openNumbersView,
        openPlanetsView
    }), [
        closeHeader,
        closeSettingsPopup,
        handleCloseSound,
        handleSound,
        openHeader,
        openLettersView,
        openNumbersView,
        openPlanetsView,
        openSettingsPopup,
        toggleHeader
    ]);

    return (
        <HeaderMenuContext.Provider value={headerMenuValues}>
            <HeaderHandlersContext.Provider value={headerMenuHandlers}>
                {children}
            </HeaderHandlersContext.Provider>
        </HeaderMenuContext.Provider>
    );
};
