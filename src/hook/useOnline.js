import { useEffect, useState } from "react";

const useOnline = () => {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function checkIsOnline() {
            setIsOnline(navigator.onLine);
        }

        window.addEventListener("online", checkIsOnline);
        window.addEventListener("offline", checkIsOnline);

        return () => {
            window.removeEventListener("online", checkIsOnline);
            window.removeEventListener("offline", checkIsOnline);
        };
    }, []);

    return isOnline;
};

export default useOnline;
