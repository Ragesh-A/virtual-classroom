const ExpandImages = ({ close, children, source }) => {

  return (
    <div className="fixed flex flex-col justify-center items-center w-full h-full top-0 left-0 bg-black bg-opacity-25 z-[3]">
      <i onClick={()=>close(false)} className="fa-solid fa-xmark relative text-white bg-slate-800 rounded-full w-8 text-center cursor-pointer grid place-items-center h-8 -bottom-5"></i>
      <div className="flex overflow-x-scroll h-[70vh] scroll">
        <img src={source} alt="expanded" />
      </div>
    </div>
  )

};

export default ExpandImages;