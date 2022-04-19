import { useState, useCallback, useRef } from "react";

const useScroll = () => {
    const [buttonVisible, setButtonVisible] = useState(false);
    const prevScrollPos = useRef(window.pageYOffset);

    const handleScroll = useCallback(() => {
        let currentScrollPos = window.pageYOffset;
        if (currentScrollPos > prevScrollPos.current) {
            setButtonVisible(false);
        } else {
            setButtonVisible(true);
        }

        if (window.scrollY === 0) {
            setButtonVisible(false);
        }

        prevScrollPos.current = currentScrollPos;
    }, [setButtonVisible]);

    return { handleScroll, buttonVisible };
};

export default useScroll;
