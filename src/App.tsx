
import './App.scss';
import RepoFilter from './components/RepoFilter';
import { UserContextProvider } from './contexts/UserContext';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="app">
      <UserContextProvider>
        <SearchBar />
        <RepoFilter />
      </UserContextProvider>
    </div>
  );
}

export default App;
