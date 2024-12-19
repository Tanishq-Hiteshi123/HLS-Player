import { IoMdMusicalNote } from "react-icons/io";
import { RiPlayListAddFill } from "react-icons/ri";
function SongInfo() {
  return (
    <div className=" w-[30%] h-[15%] p-1 flex items-start justify-start gap-[0.4rem] flex-col">
      <div className="flex items-center justify-between w-[100%] ">
        <div className="flex items-center">
          <IoMdMusicalNote size={"1.3rem"} color="#d8d823ad" />
          <h2 className="text-[#d8d823ad] font-semibold">Walking The Wire</h2>
        </div>
        <RiPlayListAddFill
          color="gray"
          size={"1.3rem"}
          className="cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-start gap-5 px-2">
        <h2 className="text-[0.69rem] text-gray-600">Jaylon Gouse, 2018</h2>
        <h2 className="genre text-pink-700 text-[0.75rem] bg-[#edd1d5] px-1 uppercase font-extrabold">
          {" "}
          Indie{" "}
        </h2>
      </div>
      <div className="flex items-center px-2 gap-2">
        <img
          src="https://i.pinimg.com/736x/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg?b=t"
          alt=""
          className="h-5 w-5 object-cover rounded-sm"
        />
        <h1 className="uppercase text-[0.7rem] font-bold text-gray-700">
          Main Square
        </h1>
      </div>
    </div>
  );
}

export default SongInfo;
