import { Routes, Route, BrowserRouter } from "react-router-dom";
import Nav from "./Components/Navbar";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import AppContext from "./utils/Context";
import Upload from "./Pages/fileUpload";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import About from "./Pages/About";
import Blog from "./Pages/Blogs";
import BlogDetail from "./Pages/BlogDeatils"

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
          path="/blogs"
          element={
            <>
              <Nav />
              <Blog />
            </>
          }
        />
        <Route path="/blog/:id" element={<><Nav/><BlogDetail /></>} />
        <Route
          path="/consult"
          element={
            <AppContext>
              <Chat />
            </AppContext>
          }
        />

        <Route
          path="/about"
          element={
            <AppContext>
              <Nav />
              <About />
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
