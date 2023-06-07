
const AnnouncementCard = () => {
  return(
    <div className="p-3 px-4 rounded-md flex max-w-[350px] shadow shadow-shadow">
      <div className="">
        <h4 className="font-bold text-2xl">Live class</h4>
        <p className="text-textColor ">class started! what are you waiting for</p>
        <button className="bg-red-500 text-white px-2 py-1 mt-3 min-w-[100px] rounded">Join</button>
      </div>
      <div className="w-[250px] flex justify-center items-center">
      <i className="ri-play-circle-line text-3xl"></i>
      </div>
    </div>
  )
}

export default AnnouncementCard;