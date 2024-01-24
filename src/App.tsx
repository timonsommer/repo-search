import './styles/App.scss';
import RepoFilter from './components/RepoFilter';
import { UserContextProvider } from './contexts/UserContext';
import SearchBar from './components/SearchBar';
import { Suspense } from 'react';

function App() {
  return (
    <div className="app">
      <UserContextProvider>
        <SearchBar />
        <Suspense fallback="">
        <RepoFilter />
        </Suspense>
      </UserContextProvider>
    </div>
  );
}

export default App;
