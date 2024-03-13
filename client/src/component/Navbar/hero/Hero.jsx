import axios from "axios";
import { useState } from "react";
import Popup from "reactjs-popup";

function Hero() {
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const closePopup = () => {
    setOpen(false);
    setId("");
  };

  const handelUrl = (e) => {
    e.preventDefault();

    setUrl(e.target.value);
  };
  async function handelPost() {
    const config = {
      headers: { "content-type": "application/json" },
      withCredentials: true,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/url",
        { url: url },
        config
      );
      console.log(res.data.id);
      setId(res.data.id);
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="w-full flex justify-center  flex-col items-center mt-20">
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-6xl p-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 ">
          Shorten Your Loooong Links :)
        </h1>
      </div>
      <div>
        <p className="text-gray-400 text-center">
          Linkly is an efficientand easy-to-use URL shorteining services that
          streamline your<br></br>online experience
        </p>
      </div>
      <div className="w-2/5 max-md:w-5/6 max-md:h-auto  flex justify-center  mt-10 items-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 flex  text-white absolute mx-4 left-0  "
        >
          <path
            fillRule="evenodd"
            d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
            clipRule="evenodd"
          />
        </svg>

        <input
          onChange={(e) => {
            handelUrl(e);
          }}
          type="text"
          placeholder="Enter link here"
          className="border-4 border-opacity-30 bg-black text-white  border-indigo-200 outline-none rounded-full px-10 h-[4vw] md:h-[6vw] max-lg:h-[2.9vh] lg:h-[4vw]  max-md:h-[6.9vh] w-full"
        />

        <button
          onClick={() => {
            handelPost();
            setOpen(true);
          }}
          className="text-white  max-md:text-sm font-semibold absolute right-0 mx-[5px] bg-blue-600 h-5/6 rounded-full md:w-[12vw]  max-md:w-[15vh] w-1/4 max-lg:text-sm max-lg:w-[6vh]"
        >
          Shorten Now!
        </button>
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closePopup}>
        <div className="cursor-pointer bg-white rounded mt-[10vw]  w-[15vw] h-[10vw]">
          <div className="flex justify-between  items-center">
            <h1 className="p-2 font-bold">Your Url</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 text-indigo-500 p-2"
              onClick={closePopup}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="model w-full mt-5 text-black rounded  flex justify-center items-center">
            {id ? (
              <span>http://localhost:8000/{id}</span>
            ) : (
              <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
            )}
          </div>
        </div>
      </Popup>
      ;
    </div>
  );
}

export default Hero;
