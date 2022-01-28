import "./header.css";
import { Search, Chat } from "@mui/icons-material";
import { IoList, IoEnterOutline, IoExitOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
    const { setIsMenuOpen, isMenuOpen, setUser, user } =
        useContext(AuthContext);

    const navigate = useNavigate();

    function logOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(null);
            navigate("/register");
        });
    }

    return (
        <div className="header">
            <div className="headerWrapper">
                <div className="headerLeft">
                    <div
                        className="headerMenuContainer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <IoList className="headerMenuIcon" />
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
                    <Search className="headerSearchIcon" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="searchInput"
                    />
                </div>

                <div className="headerRight">
                    <div className="searchContainer">
                        <Search className="headerLeftSearchIcon" />
                    </div>
                    <div className="notificationContainer">
                        <Chat className="notiIcon" />
                        <span className="notification">1</span>
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
    );
};

export default Header;
