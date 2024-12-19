import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import { useContext, useState } from "react";
import { identifyTheType } from "../utils";
import FileUploadation from "../Components/FileUploadation";

function Home() {
  const navigate = useNavigate();

  const { setFileUrl } = useContext(UserContext);

  const [url, setUrl] = useState("");

  const handleURL = (e) => {
    setUrl(e.target.value);
  };

  const handleURLSubmit = async (e) => {
    e.preventDefault();
    console.log(url);
    localStorage.setItem("fileUrl", url);
    setFileUrl(url);
    if (url.includes(".m3u8")) {
      identifyTheType(url)
        .then((result) => {
          if (result === "video") {
            navigate("/video/hls");
          } else if (result === "audio") {
            navigate("/audio/hls");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (url.includes(".mp3")) {
      navigate("/audio/mp3");
    } else if (url.includes("mp4")) {
      navigate("/video/mp4");
    }
  };

  const handleFileUpload = (e) => {
    const fileDetails = e.target.files[0];
    console.log(fileDetails);
    if (fileDetails.name.includes(".mp4")) {
      const fileUrl = window.URL.createObjectURL(fileDetails);

      setFileUrl(fileUrl);
      localStorage.setItem("fileUrl", fileUrl);
      navigate("/video/mp4");
    } else if (fileDetails.name.includes(".mp3")) {
      const fileUrl = window.URL.createObjectURL(fileDetails);
      setFileUrl(fileUrl);
      localStorage.setItem(fileUrl, fileUrl);
      navigate("/audio/mp3");
    }
  };


  return (
    <div className="h-full w-full bg-gradient-to-r from-indigo-500 ">
      <div className="h-[100vh]  flex items-center gap-5 justify-around  ">
        <div className="w-[40vw] h-[60%]">
          <img
            src="https://plus.unsplash.com/premium_photo-1720796408865-77661f4f23c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-[30rem] rounded-md"
          />
        </div>

        <div className=" w-[50vw] flex items-center justify-center mb-12 flex-col gap-5 ">
          <form
            onSubmit={handleURLSubmit}
            className="w-full flex items-center justify-center flex-col gap-4"
          >
            <input
              className="px-4 w-[100%] py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              name="url"
              onChange={handleURL}
              value={url}
              placeholder="example.mp4"
            />
            <button
              className="bg-purple-500 text-white p-2 rounded"
              type="submit"
            >
              Upload
            </button>
          </form>

          <h1>--OR--</h1>

          <FileUploadation handleFileUpload={handleFileUpload} />
        </div>
      </div>
    </div>
  );
}

export default Home;
