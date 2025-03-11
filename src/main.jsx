import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { AuthProvider } from "./Components/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider> {/* Wrap AuthProvider Here */}
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
