/* eslint-disable react/prop-types */
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ islogout, setlogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const config = {
      headers: { "content-type": "application/json" },
      withCredentials: true,
    };
    try {
      const res = await axios.post(
        "https://url-shortnerapi-opal.vercel.app/logout",
        config
      );
      if (res) {
        localStorage.removeItem("token");
        document.cookie = "uuid=; Max-Age=-99999999;";
        setlogout(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {}
      <div className="bg-black max-h-[100px] h-[60px] flex justify-around">
        <div className="max-w-[8.5vw] ">
          <Link to="/">
            <h1 className="h-full font-bold  text-white cursor-pointer text-3xl flex justify-center items-center">
              Easy
            </h1>
          </Link>
        </div>
        <div className="flex justify-between gap-5">
          {islogout ? (
            <div className="flex justify-between gap-5">
              <button
                className=""
                onClick={() => {
                  navigate("/signin");
                }}
              >
                <a
                  href="#"
                  className=" py-2 rounded px-4 text-white bg-blue-600"
                >
                  Sign In
                </a>
              </button>
              <button
                className=""
                onClick={() => {
                  navigate("/signup");
                }}
              >
                <a
                  href="#"
                  className=" py-2 rounded px-4 text-white bg-blue-600"
                >
                  Sign Up
                </a>
              </button>
            </div>
          ) : (
            <div className="flex justify-between gap-5">
              <button
                className=""
                onClick={() => {
                  handleLogout();
                }}
              >
                <a
                  href="#"
                  className=" py-2 rounded px-4 text-white bg-blue-600"
                >
                  logout
                </a>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
