import {
    IoEnterOutline,
    IoSearchOutline,
    IoExitOutline,
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
import ThemeToggle from "../themeToggle/ThemeToggle";

const Header = () => {
    const [value, setValue] = useState("");
    const { setIsMenuOpen, setUser, user } = useAuthContext();
    const [showSearchBar, setShowSearchBar] = useState(false);

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
        setValue("");
        navigate(`/profile/${uid}`);
    }

    function hideHeaderSearchBox() {
        setValue("");
        setShowSearchBar(false);
    }

    if (showSearchBar) {
        searchRef?.current?.focus();
    }

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
                            Chin Aw
                        </Link>
                    </div>

                    <div
                        className="headerCenter"
                        style={{
                            width:
                                window.innerWidth <= 720
                                    ? showSearchBar
                                        ? "65%"
                                        : 0
                                    : "",
                        }}
                    >
                        <IoSearchOutline className="headerSearchIcon" />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search"
                            className="headerSearchInput"
                            value={value}
                            onChange={searchUser}
                            onBlur={() => setShowSearchBar(false)}
                        />
                        {value && (
                            <IoCloseOutline
                                className="searchCloseIcon"
                                onClick={hideHeaderSearchBox}
                            />
                        )}

                        {value && (
                            <SearchResult
                                users={users}
                                value={value}
                                toProfile={toProfile}
                                searchRef={searchRef}
                            />
                        )}
                    </div>

                    <div className="headerRight">
                        {showSearchBar === false && (
                            <div className="searchContainer">
                                <IoSearchOutline
                                    onClick={() => setShowSearchBar(true)}
                                    className="headerLeftSearchIcon"
                                />
                            </div>
                        )}
                        <div className="themeContainer">
                            <ThemeToggle />
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
