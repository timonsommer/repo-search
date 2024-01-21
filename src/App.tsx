import React, { useState } from 'react';
import './App.scss';
import RepoFilter from './components/RepoFilter';

function App() {
  const [alert, setAlert] = useState<string>("");
  const [username, setUsername] = useState<string>("timonso");

  return (
    <div className="App">
      <header className="App-header">
        <RepoFilter _username={username}/>
      </header>
    </div>
  );
}

export default App;
