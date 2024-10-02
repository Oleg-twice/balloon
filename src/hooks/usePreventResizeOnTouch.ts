import { useEffect } from "react";

export const usePreventResizeOnTouch = () => {
    useEffect(() => {
        const handlePrevent = (e: TouchEvent) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }

        document.addEventListener('touchmove', handlePrevent, { passive: false });

        return () => {
            document.removeEventListener('touchmove', handlePrevent);
        }
    }, []);
};
