import React from 'react';
import Preloader from "../App";


export function  withSuspense < WrapProps > (WrappedComponent: React.ComponentType < WrapProps > ){
    return (props:WrapProps) => {
        return <React.Suspense fallback = { < Preloader / > } >
            <WrappedComponent {...props} />
        </React.Suspense >
    };
}