import * as React from "react";

let StoreContext = React.createContext(null)

export const Provider = (props)=>{
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContext;