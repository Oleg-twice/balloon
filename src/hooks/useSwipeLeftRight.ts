import React, { useCallback, useRef } from 'react';

type UseSwipeLeftRightType = {
    currentIndex: number;
    prevSlide: () => void;
    nextSlide: () => void;
};

export const useSwipeLeftRight = ({ currentIndex = 0, prevSlide, nextSlide }: UseSwipeLeftRightType) => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const startX = useRef(0);
    const deltaX = useRef(0);
    const isDragging = useRef(false);

    const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
        if ('touches' in e) {
            startX.current = e.touches[0].clientX;
        } else {
            startX.current = e.clientX;
            isDragging.current = true;
        }

        deltaX.current = 0;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
        if ('touches' in e) {
            deltaX.current = e.touches[0].clientX - startX.current;
        } else {
            if (!isDragging.current) return;

            deltaX.current = e.clientX - startX.current;
        }

        if (trackRef.current) {
            trackRef.current.style.transform = `translate(${deltaX.current - currentIndex * 100}%)`
        }
    }, [currentIndex]);

    const handleTouchEnd = useCallback(() => {
        if (deltaX.current > 50) {
            prevSlide();
        }

        if (deltaX.current < -50) {
            nextSlide();
        }

        if (trackRef.current) {
            trackRef.current.style.transition = 'transform 0.3s ease-in-out';
            trackRef.current.style.transform = `translate(${-currentIndex * 100}%)`
        }

        isDragging.current = false;
    }, [currentIndex, nextSlide, prevSlide]);

    return {
        isDragging,
        trackRef,
        handleTouchEnd,
        handleTouchMove,
        handleTouchStart
    }
};
