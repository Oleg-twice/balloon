import { useContext } from "react";
import { HeaderHandlersContext } from "../HeaderMenuContext";

export const useHeaderHandlersContext = () => {
    const context = useContext(HeaderHandlersContext);

    if (!context) {
        throw new Error('useHeaderMenuContext must be used within a HeaderMenuContext');
    }

    return context;
};