import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchResult from "../../components/searchResult/SearchResult";
import useSearch from "../../hook/useSearch";
import "./search.css";

const Search = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");

    const { onSearch, users } = useSearch();

    const searchRef = useRef();
    const navigate = useNavigate();

    const searchUser = (e) => {
        setValue(e.target.value);
        onSearch(e);
    };

    const toProfile = (uid) => {
        setIsFocused(false);
        navigate(`/profile/${uid}`);
    };

    return (
        <div className="search">
            <div className="searchInputContainer">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search..."
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={searchUser}
                    value={value}
                    ref={searchRef}
                />

                {isFocused && (
                    <SearchResult
                        users={users}
                        searchRef={searchRef}
                        toProfile={toProfile}
                        value={value}
                    />
                )}
            </div>
        </div>
    );
};

export default Search;
