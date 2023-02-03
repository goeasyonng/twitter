import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          !isLoggedIn && (
            <>
              <Route path="/" element={<Auth />} />
            </>
          )
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
