import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home/App";
import Schdl from "./pages/schdl/App";
import Rpt from "./pages/rpt/App";
import { SCREEN } from "./constants/screenUrl";

const RootRoutes: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={SCREEN.HOME}>홈</Link>
            </li>
            <li>
              <Link to={SCREEN.SCHDL}>일정</Link>
            </li>
            <li>
              <Link to={SCREEN.RPT}>보고서</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path={SCREEN.HOME} element={<Home />} />
          <Route path={SCREEN.SCHDL} element={<Schdl />} />
          <Route path={SCREEN.RPT} element={<Rpt />} />
        </Routes>
      </div>
    </Router>
  );
};

export default RootRoutes;
