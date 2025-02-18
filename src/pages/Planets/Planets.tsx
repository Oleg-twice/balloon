import SolarSystems from "@/components/SolarSystem/SolarSystems";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useCallback } from "react";


const Planets = () => {
    const getSourceSound = useCallback((planetName: string) => `${import.meta.env.BASE_URL}planets/audio/${planetName.toLocaleLowerCase()}.mp3`, []);
    const { handleSound } = usePlaySound('', getSourceSound);
    const handlePlaySound = useCallback((planetName: string) => {
        console.log(planetName)
        handleSound(planetName);
    }, [handleSound]);
    return (<SolarSystems handlePlaySound={handlePlaySound} />);
};

export default Planets;