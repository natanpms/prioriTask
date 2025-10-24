import { useEffect, useState } from 'react';

const TABLET_BREAKPOINT = 1200;

export function useIsTablet() {
    const [isTablet, setIsTablet] = useState<boolean>();

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);

        const onChange = () => {
            setIsTablet(window.innerWidth < TABLET_BREAKPOINT);
        };

        mql.addEventListener('change', onChange);
        setIsTablet(window.innerWidth < TABLET_BREAKPOINT);

        return () => mql.removeEventListener('change', onChange);
    }, []);

    return !!isTablet;
}
