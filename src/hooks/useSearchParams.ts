import { useState, useEffect, useCallback } from 'react';

export const useSearchParams = (defaultPage = '') => {
    const getPageFromUrl = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('page') || defaultPage
    }, [defaultPage]);

    const [page, setPage] = useState(getPageFromUrl);

    useEffect(() => {
        const handlePopState = () => {
            setPage(getPageFromUrl());
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        }
    }, [getPageFromUrl]);

    const navigate = useCallback((newPage: string) => {
        const params = new URLSearchParams();
        params.set('page', newPage);
        window.history.pushState({}, '', `?${params.toString()}`);
        setPage(newPage);
    }, []);

    return {
        navigate,
        page,
        getPageFromUrl
    }
};
