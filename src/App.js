import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ callback }) {
  const notify = () => {
    console.log("service worker update waiting");
    toast("A new version is available: exit the app to update");
    setTimeout(() => {
      window.location.reload(true);
    }, 5000); // wait 5 seconds before reloading the page to show the toast message
  };

  React.useEffect(() => {
    callback.onUpdate = () => {
      notify();
    };
  }, [callback]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is react app <strong>V6</strong>
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

      <ToastContainer />
    </div>
  );
}

export default App;
