import React, { useState, useEffect } from 'react';

const PREFIX = 'codepen-clone';

export default function useLocalStorage(key, initialValue) {
    const prefixkey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const JSONValue = localStorage.getItem(prefixkey);

        if(JSONValue != null) {
            return JSON.parse(JSONValue);
        } 

        if(typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixkey, JSON.stringify(value));
    }, [prefixkey, value])
    return [value, setValue];
}
