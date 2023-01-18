import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const [responseError, setResponseError] = useState("");
  const [loading, setLoading] = useState(false);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const handlePromptChange = (event) => {
    setUserPrompt(event.target.value);
  };
  const response = async () => {
    try {
      setLoading(true);
      await openai
        .createImage({
          prompt: userPrompt,
          n: 1,
          size: "1024x1024",
        })
        .then((response) => {
          setImagesrc(response.data.data[0].url);
          setResponseError("");
          setLoading(false);
        })
        .catch((error) => {
          setResponseError(
            "There was an error with your request. Please try again."
          );
          setLoading(false);
        });
    } catch (error) {
      setResponseError(
        "There was an error with your request. Please try again."
      );
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-full w-full ">
      <div className="flex flex-col gap-6 justify-center items-center	">
        <p className="text-2xl font-extrabold	">Enter your prompt here</p>

        <div className=" relative w-1/2">
          <input
            type="text"
            id="rounded-email"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter here"
            maxLength={250}
            minLength={1}
            onChange={(e) => handlePromptChange(e)}
          />
        </div>

        <button
          type="button"
          className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-1/2 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          onClick={() => response()}
        >
          {loading ? (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2 animate-spin"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
            </svg>
          ) : null}
          {loading ? "Loading" : "Generate"}
        </button>
      </div>

      <a href="#" className="relative block pt-4">
        <img
          alt={responseError ? responseError : "Generated Image"}
          src={imagesrc}
          className="mx-auto object-cover rounded-lg h-96 aspect-square drop-shadow-2xl"
        />
      </a>
    </div>
  );
}

export default App;
