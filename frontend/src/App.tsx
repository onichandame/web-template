import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

import logo from "./logo.svg";
import "./App.css";

const schema = gql`
  query greet($name: String!) {
    greet(name: $name) {
      timestamp
      message
    }
  }
`;

function App() {
  const { error, loading, data } = useQuery(schema, {
    pollInterval: 1000,
    variables: { name: `name` },
  });
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
        <h3>
          {error
            ? error.message
            : loading
            ? `loading`
            : data
            ? data.greet.message
            : `not loaded`}
        </h3>
      </header>
    </div>
  );
}

export default App;
