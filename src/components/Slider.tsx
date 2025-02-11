import React, { useState, memo, useMemo, useCallback, useRef } from "react";
import './Slider.css';
import BallonsList from "./BallonsList";

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

    // TODO: Put this logic in separate hook
    const soundRef = useRef<HTMLAudioElement | null>(null);

    const handleSound = useCallback(() => {
        if (!soundRef?.current) return;

        soundRef.current.src = `${import.meta.env.BASE_URL}/missle.mp3`;
        soundRef.current.play();
    }, []);

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
                className="slide"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
            >
                <BallonsList type={ballonListType} list={items.slice(start, end)} handleSayOnClick={handleSayOnClick} />
            </div>
        );
    }), [ballonListType, columns, handleSayOnClick, items, itemsPerSlide, maxIndex])

    return (
        <div className="slider">
            <audio ref={soundRef} />
            <button className="arrow" onClick={prevSlide} disabled={currentIndex < 1}>
                ◀
            </button>

            <div className="viewport">
                <div
                    className="track"
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