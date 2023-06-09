import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AuthProvider } from "./contexts/authContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { SearchProvider } from "./contexts/searchContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
