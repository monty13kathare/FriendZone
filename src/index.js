import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

const clientId = process.env.REACT_APP_CLIENT_ID || '';


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <GoogleOAuthProvider clientId={clientId}> */}
        <App />
      {/* </GoogleOAuthProvider> */}
    </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
