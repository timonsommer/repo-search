import "./styles/App.scss";
import RepoFilter from "./components/RepoFilter";
import { UserContext } from "./contexts/UserContext";
import SearchBar from "./components/SearchBar";
import { useContext } from "react";

// provide a key to RepoFilter to reset component data on username change
function App() {
  const { username } = useContext(UserContext);
  return (
    <div className="app">
      <SearchBar />
      {username && <RepoFilter key={username} userQuery={username} />}
    </div>
  );
}

export default App;
