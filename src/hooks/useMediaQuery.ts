import { useLayoutEffect, useCallback, useState, useMemo } from "react";

const initialQueriesList = [
    '(max-width: 766px)', // Mobile
    '(min-width: 767px) and (max-width: 1199px)', // Tablet
    '(min-width: 1200px)', // Desktop
    '(orientation: landscape)', // Landscape orientation
];

export const useMediaQuery = (queries?: string[]) => {
    const currentQueries = queries?.length ? queries : initialQueriesList;
    const mediaQueriesList = useMemo(
        () => currentQueries.map((query) => matchMedia(query)),
        [currentQueries]
    );

    const getMatchesList = useCallback(
        () => mediaQueriesList.map((o) => o.matches),
        [mediaQueriesList]
    );

    const [values, setValues] = useState(getMatchesList());

    const handler = useCallback(
        () => setValues(getMatchesList()),
        [getMatchesList],
    );

    useLayoutEffect(() => {
        mediaQueriesList.forEach((query) => query?.addEventListener('change', handler));

        return () => mediaQueriesList.forEach((query) => query?.removeEventListener('change', handler));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return values;
}
