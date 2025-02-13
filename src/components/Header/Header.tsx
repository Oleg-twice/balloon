import { Button } from "../Buttons/Button";
import { RoundButton } from "../Buttons/RoundButton";
import { FullscreenButton } from "../Buttons/FullscreenButton";
import { SettingsModal } from "../Modals/SettingsModal";
import { useHeaderMenuContext, useHeaderHandlersContext } from "@/context/HeaderMenuContext/hooks";
import './Header.css';
import { useCallback } from "react";

const Header = () => {
    const { isNumbers, isPopupMenuOpen, isHeaderOpen } = useHeaderMenuContext();
    const {
        chooseBallonTypeClick,
        openSettingsPopup,
        closeSettingsPopup,
        closeHeader,
        toggleHeader
    } = useHeaderHandlersContext();

    const onClose = useCallback(() => {
        closeHeader();
        closeSettingsPopup();
    }, [closeHeader, closeSettingsPopup]);

    return (
        <header className={`header${isHeaderOpen ? ' header-open' : ''}`}>
            <Button
                type="button"
                onClick={openSettingsPopup}
                text="НАСТРОЙКИ"
                translate="no"
            />
            <FullscreenButton />
            <SettingsModal
                isOpen={isPopupMenuOpen}
                onClose={onClose}
                isNumbers={isNumbers}
                onButtonClick={chooseBallonTypeClick}
            />
            <RoundButton className="open-header-button" onClick={toggleHeader}>
                <svg className={isHeaderOpen ? 'open-arrow' : ''} focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
            </RoundButton>
        </header>
    );
};

export default Header;
