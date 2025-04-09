import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ callback }) {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const notify = () => {
    console.log("service worker update waiting");
    toast("A new version is available: exit the app to update");
    // setTimeout(() => {
    //   window.location.reload(true);
    // }, 5000); // wait 5 seconds before reloading the page to show the toast message
  };

  React.useEffect(() => {
    // Attach your custom update callback.
    callback.onUpdate = () => {
      setUpdateAvailable(true);
    };
  }, [callback]);
  //

  // Function to reload when the user agrees to update.
  const handleRefresh = () => {
    // Optionally send a message to the service worker to skip waiting:
    // (This assumes your service-worker.js listens for 'SKIP_WAITING')
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });
    }
    // Now refresh the page to load the new version.
    window.location.reload();
  };

  console.log({ updateAvailable });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is react app <strong>V.20</strong>
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

      {updateAvailable && (
        <div
          className="update-notification"
          style={{
            background: "#fffae6",
            padding: "10px",
            textAlign: "center",
            position: "absolute",
            top: "0",
          }}
        >
          <p>A new version of the app is available.</p>
          <button onClick={handleRefresh}>Refresh</button>
          <button onClick={() => setUpdateAvailable(false)}>Dismiss</button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
