import { useContext, ChangeEvent } from "react";
import { UserContext } from "../contexts/UserContext";
import { useDebouncedCallback } from "use-debounce";

function SearchBar() {
    const { setUsername } = useContext(UserContext);

    const handleInput = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, 400);

    return (
        <div className="search-bar">
            <input className="search-bar__input" type="text" placeholder="Enter username..." onChange={(e) => handleInput(e)} />
        </div>
    );


}

export default SearchBar;