import React, { useState, memo, useMemo } from "react";
import './Slider.css';
import BallonsList from "../BalloonsList/BalloonsList";
import { useSwipeLeftRight } from "../../hooks/useSwipeLeftRight";
import { usePlaySound } from "../../hooks/usePlaySound";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface SliderProps {
    items: string[];
    visibleCount?: number;
    ballonListType: string;
    handleSayOnClick: (arg: string) => void;
    columns?: number;
}

export const Slider: React.FC<SliderProps> = ({
    items = [],
    visibleCount = 10,
    ballonListType,
    handleSayOnClick,
    columns = 5
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = visibleCount;
    const maxIndex = Math.max(0, Math.ceil(items.length / itemsPerSlide) - 1);
    const [isMobile,,,isLandscape] = useMediaQuery();

    const { handleSound } = usePlaySound(`${import.meta.env.BASE_URL}/missle.mp3`);

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex((prev) => prev + 1);
            handleSound();
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            handleSound();
        }
    };

    const list = useMemo(() => Array.from({ length: maxIndex + 1 }, (_, index) => {
        const start = index * itemsPerSlide;
        const end = start + itemsPerSlide;
        return (
            <div
                key={index}
                className={`slide${isMobile ? ' slide--mobile' : ''}`}
                style={{
                    gridTemplateColumns: `repeat(${columns}, ${isMobile ? '0' : '1'}fr)`,
                }}
            >
                <BallonsList type={ballonListType} list={items.slice(start, end)} handleSayOnClick={handleSayOnClick} />
            </div>
        );
    }), [ballonListType, columns, handleSayOnClick, isMobile, items, itemsPerSlide, maxIndex]);

    const {
        trackRef,
        handleTouchEnd,
        handleTouchMove,
        handleTouchStart
    } = useSwipeLeftRight({ currentIndex, nextSlide, prevSlide });

    return (
        <div className={`slider${isMobile ? ' slider--mobile' : ''}${isLandscape ? ' slider--landscape' : ''}`}>
            <button className="arrow" onClick={prevSlide} disabled={currentIndex < 1}>
                ◀
            </button>

            <div
                className={`viewport${isMobile ? ' viewport--mobile' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
            >
                <div
                    className="track"
                    ref={trackRef}
                    style={{
                        transform: `translateX(${-currentIndex * 100}%)`,
                    }}
                >
                    {list}
                </div>
            </div>

            <button className="arrow" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
                ▶
            </button>
        </div>
    );
};

export default memo(Slider);