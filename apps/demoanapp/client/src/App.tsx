import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CatsApi } from './generated-api';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

  const sayHello = async () => {
    const catsApi = new CatsApi(undefined);
    const body = await catsApi.catsIdGet({id:"0"});
    console.log(body);
  };
  sayHello();

export default App;
