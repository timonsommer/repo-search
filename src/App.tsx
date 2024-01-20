import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchRepos } from './services/queries';
import { Status } from './types/Status';

function App() {
  const [alert, setAlert] = useState<string>("");
  const [username, setUsername] = useState<string>("timonso");

  useEffect(() => {
    fetchRepos(username).then((data) => {
      if (data.status !== Status.SUCCESS) {
        setAlert(data.status);
      }
      console.log(data);
    });
  },
    [username]);

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
