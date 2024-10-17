import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home/App";
import Schdl from "./pages/schdl/App";
import Rpt from "./pages/rpt/App";
import Auth from "./pages/auth/App";
import Record from "./pages/record/App";
import Note from "./pages/note/App";
import { SCREEN } from "./constants/screenUrl";
import Container from "./elements/container/Container";

const RootRoutes: React.FC = () => {
    return (
        <Router>
            <Container className="container">
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
                        <li>
                            <Link to={SCREEN.RECORD}>기록</Link>
                        </li>
                        <li>
                            <Link to={SCREEN.NOTE}>아기수첩</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path={SCREEN.HOME} element={<Home />} />
                    <Route path={SCREEN.SCHDL} element={<Schdl />} />
                    <Route path={SCREEN.RPT} element={<Rpt />} />
                    <Route path={SCREEN.AUTH} element={<Auth />} />
                    <Route path={SCREEN.RECORD} element={<Record />} />
                    <Route path={SCREEN.NOTE} element={<Note />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default RootRoutes;
