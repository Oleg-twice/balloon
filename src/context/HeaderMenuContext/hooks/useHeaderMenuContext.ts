import { useContext } from "react";
import { HeaderMenuContext } from "../HeaderMenuContext";

export const useHeaderMenuContext = () => {
    const context = useContext(HeaderMenuContext);

    if (!context) {
        throw new Error('useHeaderMenuContext must be used within a HeaderMenuContext');
    }

    return context;
};
