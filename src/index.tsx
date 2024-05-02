import ReactDOM from "react-dom/client";

import App from "./App";

import enableMock from "./mock";

import "./index.css";
import "./scroll.css";

enableMock();

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
