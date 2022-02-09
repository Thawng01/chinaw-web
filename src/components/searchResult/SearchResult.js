import { useState, useEffect } from "react";

import useAuthContext from "../../hook/useAuthContext";
import "./searchResult.css";

const SearchResult = ({ users, value, searchRef, toProfile }) => {
    const [currentIndex, setCurrentIndex] = useState(-1);

    const { dark } = useAuthContext();

    useEffect(() => {
        const myRef = searchRef.current;
        if (users && value) {
            myRef.addEventListener("keyup", onPressArrowKey);
        } else {
            myRef.removeEventListener("keyup", onPressArrowKey);
        }

        return () => {
            myRef.removeEventListener("keyup", onPressArrowKey);
        };
    }, [users, value, searchRef, onPressArrowKey]);

    let activeIndex = -1;
    function onPressArrowKey(e) {
        const up = e.key === "ArrowUp";
        const down = e.key === "ArrowDown";
        const enter = e.key === "Enter";

        if (up) {
            if (activeIndex === -1) {
                activeIndex = users.length - 1;
                setCurrentIndex(activeIndex);
                return;
            }

            activeIndex -= 1;
            setCurrentIndex((prev) => prev - 1);
        }

        if (down) {
            if (activeIndex === users.length - 1) {
                activeIndex = -1;
                setCurrentIndex(activeIndex);
                return;
            }
            activeIndex += 1;
            setCurrentIndex(activeIndex);
        }

        if (enter) {
            toProfile(users[activeIndex]?.uid);
        }
    }

    return (
        <div
            style={{ backgroundColor: dark ? "#333" : "#fff" }}
            className="searchResultContainer"
        >
            {users?.length === 0 && <p className="searchResults">No result</p>}
            {users?.map((user, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            backgroundColor:
                                index === currentIndex
                                    ? dark
                                        ? "#000"
                                        : "#f0f0f0"
                                    : "",
                        }}
                        className="searchResults"
                        onClick={() => toProfile(user.uid)}
                    >
                        <img
                            src={user?.image}
                            alt=""
                            className="searchResultUserImg"
                        />
                        <p className="searchResultUsername">{user.username}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchResult;
