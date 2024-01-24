import { useContext, ChangeEvent } from "react";
import { UserContext } from "../contexts/UserContext";
import { useDebouncedCallback } from "use-debounce";
import { User as UserIcon } from "react-feather";
import IconInput from "./IconInput";
import "../styles/SearchBar.scss"

function SearchBar() {
    const { setUsername } = useContext(UserContext);

    const handleInput = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value.trim());
    }, 400);

    return (
        <div className="search-bar">
            <div>
            <h2>GitHub Repository Search</h2>
            <h4>Find public repositories by username or organization</h4>
            </div>
            <IconInput className="search-bar__input" leftIcon={<UserIcon />}>
                <input type="search" placeholder="Enter username..." onChange={(e) => handleInput(e)} />
            </IconInput>
        </div>
    );


}

export default SearchBar;