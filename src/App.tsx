import React, { useState } from 'react';
import './App.scss';
import RepoFilter from './components/RepoFilter';

function App() {
  const [alert, setAlert] = useState<string>("");
  const [username, setUsername] = useState<string>("timonso");

  return (
    <div className="App">
      <RepoFilter _username={username}/>
    </div>
  );
}

export default App;
