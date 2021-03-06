import {useState, useEffect} from "react";

export function useStickyState(defaultValue: any, key: string) {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);

        return stickyValue
            ? JSON.parse(stickyValue)
            : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}