import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Links from "./pages/Links";
import { useState } from "react";

const App = () => {
    const [links, setLinks] = useState({});

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home links={links} setLinks={setLinks}/>} />
                <Route path="/link/:id" element={<Links links={links}/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
      </Router>
    )
}

export default App
