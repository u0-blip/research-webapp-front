import { useEffect } from 'react';

const useScript = url => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = false;

        document.head.appendChild(script);
        console.log(window)
        console.log(window.Bokeh)
        return () => {
            document.head.removeChild(script);
        }
    }, [url]);
};

export default useScript;