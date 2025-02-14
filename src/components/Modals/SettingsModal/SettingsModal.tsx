import Modal, { ModalProps } from '@/components/Modals/Modal/Modal';
import { withPortal } from '@/hocs/withPortal';
import { MusicToggle } from '@/components/Buttons/MusicToggle';
import { memo } from 'react';

const ModalPortal = withPortal<ModalProps>(Modal);

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    isNumbers: boolean;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => (
    <ModalPortal isOpen={isOpen} onClose={onClose} title="НАСТРОЙКИ ЗВУКА">
        <MusicToggle />
    </ModalPortal>
);

export default memo(SettingsModal);
