import { ReactNode, useCallback, useMemo, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { HeaderHandlersContext, HeaderMenuContext } from "./HeaderMenuContext";
import { usePlaySound } from "@/hooks/usePlaySound";
import { pipe } from "@/handlers";

export const HeaderMenuProvider = ({ children }: { children: ReactNode }) => {
    const [isNumbers, setIsNumbers] = useState(false);
    const { handleSound } = usePlaySound(`${import.meta.env.BASE_URL}/click.mp3`);
    const { handleSound: handleCloseSound } = usePlaySound(`${import.meta.env.BASE_URL}/close-click.mp3`);
    
    const onButtonClick = useCallback(() => {
        setIsNumbers(prev => !prev);
        handleSound();
    }, [handleSound]);

    const { isOpen: isPopupMenuOpen, openPopup: openSettingsPopup, closePopup: closeSettingsPopup } = useModal();
    const {
        isOpen: isHeaderOpen,
        openPopup: openHeader,
        closePopup: closeHeader
    } = useModal();

    const headerMenuValues = useMemo(() => ({
        isHeaderOpen,
        isPopupMenuOpen,
        isNumbers
    }), [isHeaderOpen, isNumbers, isPopupMenuOpen]);

    const toggleHeader = useCallback(() => {
        handleSound();
        if (isHeaderOpen) {
            closeHeader();
            return;
        }

        openHeader();
    }, [closeHeader, handleSound, isHeaderOpen, openHeader]);

    const headerMenuHandlers = useMemo(() => ({
        chooseBallonTypeClick: onButtonClick,
        openSettingsPopup: pipe(handleSound, openSettingsPopup),
        closeSettingsPopup: pipe(handleCloseSound, closeSettingsPopup),
        openHeader,
        closeHeader,
        toggleHeader
    }), [closeHeader, closeSettingsPopup, handleCloseSound, handleSound, onButtonClick, openHeader, openSettingsPopup, toggleHeader])

    return (
        <HeaderMenuContext.Provider value={headerMenuValues}>
            <HeaderHandlersContext.Provider value={headerMenuHandlers}>
                {children}
            </HeaderHandlersContext.Provider>
        </HeaderMenuContext.Provider>
    );
};
