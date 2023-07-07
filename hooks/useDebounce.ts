import {useEffect, useState} from "react";


function useDebounce<T>(value:T,delay?:number):T{
    const [debounced,setDebounced] = useState<T>(value);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounced(value)
        },delay || 500);
        return ()=>{
            clearTimeout(timer)
        }
    },[value,delay])
    return debounced
}

export default useDebounce;