import React, { useEffect, useRef } from 'react';

export default function useObserver(ref, canLoad, isLoading, callback) {

    const observer = useRef();

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        var cb = function(entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                //console.log(page);
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current);
    }, [isLoading]);
}