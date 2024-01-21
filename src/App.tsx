import React, { useState } from 'react';
import './App.scss';
import RepoList from './components/RepoFilter';

function App() {
  const [alert, setAlert] = useState<string>("");
  const [username, setUsername] = useState<string>("timonso");

  return (
    <div className="App">
      <header className="App-header">
        GitHub Repository Search
      </header>
      <RepoList _username={username} />
    </div>
  );
}

export default App;
