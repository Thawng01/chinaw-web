import { useState, useCallback } from "react";

const useScroll = () => {
    const [buttonVisible, setButtonVisible] = useState(false);

    let prevScrollPos = window.pageYOffset;
    const handleScroll = useCallback(() => {
        let currentScrollPos = window.pageYOffset;
        if (currentScrollPos > prevScrollPos) {
            setButtonVisible(false);
        } else {
            setButtonVisible(true);
        }

        if (window.scrollY === 0) {
            setButtonVisible(false);
        }

        prevScrollPos = currentScrollPos;
    }, [setButtonVisible]);

    return { handleScroll, buttonVisible };
};

export default useScroll;
