import { createContext, useState } from "react";

export let CounterContext =createContext(0);

export default function CounterContextProvider(props){
    
    const [counter, setCounter] = useState(0)
    function changeCounter(){
setCounter(counter+1)

    }
    function returnCounter(){
   setCounter(counter-1)

    }

    return <CounterContext.Provider value={{counter,changeCounter,returnCounter}}>
        {props.children}
    </CounterContext.Provider>
}