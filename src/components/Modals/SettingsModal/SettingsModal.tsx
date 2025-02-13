import Modal, { ModalProps } from '@/components/Modals/Modal/Modal';
import { Button } from '@/components/Buttons/Button';
import { withPortal } from '@/hocs/withPortal';
import { MusicToggle } from '@/components/Buttons/MusicToggle';
import { memo, MouseEventHandler } from 'react';
import { pipe } from '@/handlers';

const ModalPortal = withPortal<ModalProps>(Modal);

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onButtonClick: () => void;
    isNumbers: boolean;
}

export const SettingsModal = ({ isOpen, onClose, onButtonClick, isNumbers }: SettingsModalProps) => (
    <ModalPortal isOpen={isOpen} onClose={onClose} title="НАСТРОЙКИ">
        <Button
          type="button"
          onClick={pipe(onButtonClick, onClose) as unknown as MouseEventHandler<HTMLButtonElement>}
          text={isNumbers ? 'ПОКАЗАТЬ БУКВЫ' : 'ПОКАЗАТЬ ЦИФРЫ'}
          translate="no"
        />
        <MusicToggle />
    </ModalPortal>
);

export default memo(SettingsModal);
