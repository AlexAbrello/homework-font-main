export const useDebounce = <F extends (...args: any) => void>(callback: F, delay: number) => {
   let timeoutId: ReturnType<typeof setTimeout> | null = null;
 
   return (...args: Parameters<F>) => {
     if (timeoutId) {
       clearTimeout(timeoutId);
     }
 
     timeoutId = setTimeout(() => {
       callback.apply(null, args);
       timeoutId = null;
     }, delay);
   };
 };