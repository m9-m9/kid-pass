import { createRoot } from "react-dom/client";
import RootRoutes from "./RootRoutes";
import "./styles/global.css";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <Router>
        <RootRoutes />
    </Router>,
);
