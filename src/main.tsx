import { createRoot } from "react-dom/client";
import RootRoutes from "./RootRoutes";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(<RootRoutes />);
