import { Button } from "../Buttons/Button";
import { RoundButton } from "../Buttons/RoundButton";
import { FullscreenButton } from "../Buttons/FullscreenButton";
import { SettingsModal } from "../Modals/SettingsModal";
import { useHeaderMenuContext, useHeaderHandlersContext } from "@/context/HeaderMenuContext/hooks";
import './Header.css';
import { MouseEventHandler, useCallback } from "react";
import { pipe } from "@/handlers";

const Header = () => {
    const { isNumbers, isPopupMenuOpen, isHeaderOpen } = useHeaderMenuContext();
    const {
        openSettingsPopup,
        closeSettingsPopup,
        closeHeader,
        toggleHeader,
        openLettersView,
        openNumbersView
    } = useHeaderHandlersContext();

    const onClose = useCallback(() => {
        closeHeader();
        closeSettingsPopup();
    }, [closeHeader, closeSettingsPopup]);

    return (
        <header className={`header${isHeaderOpen ? ' header-open' : ''}`}>
            <div className="header-menu-items">
                <Button
                    type="button"
                    onClick={pipe(openLettersView, onClose) as unknown as MouseEventHandler<HTMLButtonElement>}
                    text={'БУКВЫ'}
                    translate="no"
                />
                <Button
                    type="button"
                    onClick={pipe(openNumbersView, onClose) as unknown as MouseEventHandler<HTMLButtonElement>}
                    text={'ЦИФРЫ'}
                    translate="no"
                />
                <SettingsModal
                    isOpen={isPopupMenuOpen}
                    onClose={onClose}
                    isNumbers={isNumbers}
                />
                <div className="buttons-fieldset">
                    <Button
                        className="music-settings"
                        type="button"
                        onClick={openSettingsPopup}
                        text="НАСТРОЙКИ МУЗЫКИ"
                        translate="no"
                    />
                    <FullscreenButton callback={closeHeader} />
                </div>
            </div>
            <RoundButton className="open-header-button" onClick={toggleHeader}>
                <svg className={isHeaderOpen ? 'open-arrow' : ''} focusable="false" width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
            </RoundButton>
        </header>
    );
};

export default Header;
