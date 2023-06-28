const ConfirmBox = ({ visible, setVisibleFn, title, description, accepted}) => {
  
  return(
    <>
    {
      visible && <div className="bg-black bg-opacity-20 transitions fixed w-full h-full top-0 left-0 flex justify-center items-center z-[3]">
        <div className="box h-[250px] flex flex-col justify-around min-w-[250px] p-2 rounded">
          <div className="">
          <p className="text-center mb-3 font-bold text-2xl text-textColor">{title}</p>
        <p className=" px-3 text-center mb-3">Are you sure that you want to take this action</p>
          
          </div>
        <div className="flex justify-around">
            <button className="bg-gray-600 hover:bg-black text-white rounded px-3 py-1" onClick={()=> setVisibleFn(false)}>cancel</button>
            <button className="bg-lightPrimary hover:bg-primary text-white rounded px-3 py-1" onClick={()=>{accepted(visible); setVisibleFn(false)}}>confirm</button>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default ConfirmBox;