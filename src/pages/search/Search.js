import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchResult from "../../components/searchResult/SearchResult";
import useSearch from "../../hook/useSearch";
import "./search.css";

const Search = () => {
    const [value, setValue] = useState("");

    const { onSearch, users } = useSearch();

    const searchRef = useRef();
    const navigate = useNavigate();

    const searchUser = (e) => {
        setValue(e.target.value);
        onSearch(e);
    };

    function toProfile(uid) {
        setValue("");
        navigate(`/profile/${uid}`);
    }

    return (
        <div className="search">
            <div className="searchInputContainer">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search..."
                    onChange={searchUser}
                    value={value}
                    ref={searchRef}
                />

                {value && (
                    <SearchResult
                        users={users}
                        searchRef={searchRef}
                        value={value}
                        toProfile={toProfile}
                    />
                )}
            </div>
        </div>
    );
};

export default Search;
