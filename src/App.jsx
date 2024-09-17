import { Routes, Route, BrowserRouter } from "react-router-dom";
import Nav from "./Components/Navbar";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import AppContext from "./utils/Context";
import Upload from "./Pages/Fileupload";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Home />
            </>
          }
        />
        <Route
          path="/consult"
          element={
            <AppContext>
              <Chat />
            </AppContext>
          }
        />
        <Route
          path="/upload"
          element={
            <AppContext>
              {/* <Nav/> */}
              <Upload />
            </AppContext>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
