import {useState,useEffect} from 'react'

const PREFIX = 'chat-';

export default function useLocalStorage(key,initialValue) {
    const prefixedkey = PREFIX + key;
    const [storedValue,setStoredValue] = useState(() => {
        const jsonvalue = localStorage.getItem(prefixedkey);
        if(jsonvalue !== null) return JSON.parse(jsonvalue);
        if (typeof initialValue === 'function') return initialValue();
        else return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(prefixedkey,JSON.stringify(storedValue));
    },[storedValue, prefixedkey]);
    
    
    return [storedValue,setStoredValue];
}
