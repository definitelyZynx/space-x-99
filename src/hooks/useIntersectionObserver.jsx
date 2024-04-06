import { useCallback, useRef } from "react";

export function useIntersectionObserver(callback, dependencies){
  const observer = useRef(null);

  const ref = useCallback(
    (node) => {
      if(dependencies.every(Boolean)){
        observer.current?.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if(entries[0].isIntersecting){
            callback();
          }
        })

        if(node){
          observer.current.observe(node);
        }
      }
    },
    [dependencies, callback]
  )

  return ref;
}