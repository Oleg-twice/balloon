import { useState, useEffect, TouchEventHandler } from "react";
import "./FullscreenButton.css";

declare global {
    interface Document {
        webkitFullscreenElement?: Element | null;
        webkitExitFullscreen?: () => Promise<void>;
    }

    interface HTMLElement {
        webkitRequestFullscreen?: () => Promise<void>;
        mozRequestFullScreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
    }
}


const isFullscreenSupported = () => {
    const docElm = document.documentElement;
    return !!(docElm.requestFullscreen ||
              docElm.webkitRequestFullscreen ||
              docElm.mozRequestFullScreen ||
              docElm.msRequestFullscreen);
}

const FullscreenButton = () => {
    const [, setIsFullscreen] = useState(false);
    const [isSupported] = useState(isFullscreenSupported());

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
        };
    }, []);

    if (!isSupported) {
        return null;
    }

    const toggleFullscreen = () => {
        const elem = document.body;

        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch((err) => console.error("Fullscreen error:", err));
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    };

    const onTouchEnd = (e: Event) => {
        e.preventDefault();
        toggleFullscreen();
    };

    return (
        <button
            aria-label="Full screen"
            className="fullscreenButton"
            onClick={toggleFullscreen}
            onTouchEnd={onTouchEnd as unknown as TouchEventHandler<HTMLButtonElement>}
        >
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M4 10h2V6h4V4H4zm6 10v-2H6v-4H4v6zm4-16v2h4v4h2V4zm6 10h-2v4h-4v2h6z" fill="currentColor" />
            </svg>
        </button>
    );
};

export default FullscreenButton;