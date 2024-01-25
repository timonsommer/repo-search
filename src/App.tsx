import './styles/App.scss';
import RepoFilter from './components/RepoFilter';
import { UserContext } from './contexts/UserContext';
import SearchBar from './components/SearchBar';
import { useContext } from 'react';

function App() {
  const { username } = useContext(UserContext);
  return (
    <div className="app">
      <SearchBar />
      {username && <RepoFilter userQuery={username}/>}
    </div>
  );
}

export default App;
