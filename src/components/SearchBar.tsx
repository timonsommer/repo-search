import { useContext, ChangeEvent, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

function SearchBar() {
    const { setUsername } = useContext(UserContext);

    function handleInput(e: ChangeEvent<HTMLInputElement>): void {
        setUsername(e.target.value);
    }
    return (
        <div className="search-bar">
            <input className="search-bar__input" type="text" placeholder="Enter username..." onChange={(event) => handleInput(event)} />
        </div>
    );


}

export default SearchBar;