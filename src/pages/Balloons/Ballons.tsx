import { Slider } from "@/components/Slider";
import { useHeaderMenuContext } from "@/context/HeaderMenuContext/hooks";
import { lettersList, numbersList } from "@/handlers";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useCallback, useMemo } from "react";

const BallonsPage = () => {
    const { isNumbers } = useHeaderMenuContext();
    const [isMobile, , , isLandscape] = useMediaQuery();
    const columns = useMemo(() => {
        if (isMobile) {

            if (isLandscape) {
                return isNumbers ? 2 : 3;
            }

            return isNumbers ? 1 : 2;
        }

        if (!isLandscape) {
            if (isNumbers) {
                return 3
            }

            return 4;
        }

        return isNumbers ? 4 : 5;
    }, [isLandscape, isMobile, isNumbers]);

    const getSourceSound = useCallback((letter: string) => `${import.meta.env.BASE_URL}${isNumbers ? 'numbers' : 'letters'}/${letter}.mp3`, [isNumbers]);

    const { handleSound: handleSayOnClick } = usePlaySound('', getSourceSound);

    return (
        <Slider
            items={isNumbers ? numbersList : lettersList}
            handleSayOnClick={handleSayOnClick}
            ballonListType={isNumbers ? 'round' : ''}
            columns={columns}
            visibleCount={isNumbers ? 10 : 15}
        />
    );
};

export default BallonsPage
