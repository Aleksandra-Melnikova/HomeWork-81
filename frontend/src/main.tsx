import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
);
