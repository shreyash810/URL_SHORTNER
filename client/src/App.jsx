import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./component/User/SignUp";
import Home from "./Page/Home";
import SignIn from "./component/User/SignIn";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Footer from "./component/footer/Footer";

function App() {
  const [islogout, setlogout] = useState(true);

  useEffect(() => {
    if (!Cookies.get("uuid")) {
      setlogout(true);
    } else {
      setlogout(false);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar islogout={islogout} setlogout={setlogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn setlogout={setlogout} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
