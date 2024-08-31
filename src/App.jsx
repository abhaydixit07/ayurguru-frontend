import { Routes, Route, BrowserRouter } from "react-router-dom";
// import './App.css'
import Nav from "./Components/Navbar";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import AppContext from "./utils/Context";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Conditional rendering based on route path */}
        <Route
          path="*"
          element={
            <>
              {/* Render Nav only for specific routes */}
              {!["/consult"].includes(window.location.pathname) && <Nav />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/consult"
                  element={
                    <AppContext>
                      <Chat />
                    </AppContext>
                  }
                />
                {/* <Route path="/learning" element={<Learning />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/detect/:number" element={<Detection />} />
                <Route path="/overall" element={<Overalltest />} />
                <Route path="/course" element={<Coursetest />} /> */}
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
