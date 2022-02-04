import {
    IoEnterOutline,
    IoSearchOutline,
    IoExitOutline,
    // IoNotificationsOutline,
    IoListOutline,
    IoCloseOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { getAuth, signOut } from "firebase/auth";

import "./header.css";
import SearchResult from "../searchResult/SearchResult";
import useSearch from "../../hook/useSearch";
import useAuthContext from "../../hook/useAuthContext";

const Header = () => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const { setIsMenuOpen, setUser, user, dark, setDark } = useAuthContext();

    const { onSearch, users } = useSearch();

    const searchRef = useRef();

    const navigate = useNavigate();

    const searchUser = (e) => {
        setValue(e.target.value);
        onSearch(e);
    };

    function logOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(null);
            navigate("/register");
        });
    }

    function toProfile(uid) {
        setIsFocused(false);
        navigate(`/profile/${uid}`);
    }

    const handleDarkMode = () => {
        setDark(!dark);
        if (dark) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    };

    return (
        <>
            <div className="header">
                <div className="headerWrapper">
                    <div className="headerLeft">
                        <div
                            className="headerMenuContainer"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <IoListOutline className="headerMenuIcon" />
                        </div>
                        <Link
                            to="/"
                            className="headerLink"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <h2 className="headerTitle">Chin Aw</h2>
                        </Link>
                    </div>

                    <div className="headerCenter">
                        <IoSearchOutline className="headerSearchIcon" />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search"
                            className="headerSearchInput"
                            value={value}
                            onChange={searchUser}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        {value && (
                            <IoCloseOutline
                                className="searchCloseIcon"
                                onClick={() => setValue("")}
                            />
                        )}

                        {isFocused && (
                            <SearchResult
                                users={users}
                                toProfile={toProfile}
                                value={value}
                                searchRef={searchRef}
                            />
                        )}
                    </div>

                    <div className="headerRight">
                        <Link to="/search" className="searchContainer">
                            <IoSearchOutline className="headerLeftSearchIcon" />
                        </Link>
                        {/* <div className="notificationContainer">
                            <IoNotificationsOutline className="notiIcon" />
                            <span className="notification">1</span>
                        </div> */}

                        <div
                            style={{ backgroundColor: dark ? "#fff" : "#000" }}
                            className="darkMode"
                            onClick={handleDarkMode}
                        >
                            <div
                                className="darkModeToggle"
                                style={{
                                    backgroundColor: dark ? "#000" : "#fff",
                                    marginLeft: dark ? 20 : 0,
                                }}
                            />
                        </div>

                        <div className="accounts" onClick={logOut}>
                            {user ? (
                                <IoExitOutline className="accountIcon" />
                            ) : (
                                <IoEnterOutline className="accountIcon" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
