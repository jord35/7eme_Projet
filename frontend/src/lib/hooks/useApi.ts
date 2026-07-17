"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseApiResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

/**
 * Hook générique pour charger des données depuis une API.
 *
 * @param fetcher - Fonction asynchrone qui retourne les données
 * @param deps - Dépendances pour le rechargement automatique
 */
export function useApi<T>(
    fetcher: () => Promise<T>,
    deps: React.DependencyList = [],
): UseApiResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const fetcherRef = useRef(fetcher);
    fetcherRef.current = fetcher;

    const fetchData = useCallback(() => {
        setIsLoading(true);
        setError(null);
        fetcherRef.current()
            .then((result) => {
                setData(result);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, deps);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}
