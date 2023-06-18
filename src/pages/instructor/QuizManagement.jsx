const QuizManagement = () => {

  return (
    // <div className="">
    //   <i className="ri-radio-button-line"></i>
    //   <i className="ri-text"></i>
    //   <i className="ri-file-copy-fill"></i>
    //   <i className="ri-image-2-fill"></i>

    //   <i className="ri-delete-bin-5-fill"></i>
    //   <i className="ri-add-circle-line"></i>
    //   <i className="ri-more-2-fill"></i>
    // <li><i className="ri-file-copy-fill"></i></li>
    //       <li><i className="ri-delete-bin-5-fill"></i></li>
    //       <li><i className="ri-add-circle-line"></i></li>
    //       <li><i className="ri-more-2-fill"></i></li>
    
    // </div>
    <div className="flex flex-col gap-2">
      {/* HEAD */}
      <div className="p-3 md:p-4 xl:p-5 rounded-md bg-tileColor">
        <p className="uppercase text-primary tracking-wider mb-2 font-bold ">Create new</p>
        <div className="flex flex-col gap-2 w-full">
          <input type="text" placeholder="Untitled" className="px-2 py-2e rounded-md text-xl outline-none border-2 border-transparent border-b-primary"/>
          <textarea type="text" placeholder="Quiz description" className="px-2 py-2 rounded-md outline-none text-sm border-2 border-transparent border-b-primary"/>
        </div>
      </div>

      <div className="bg-tileColor p-3 md:p-4 xl:p-5 rounded-md ">
        <input type="text" placeholder="Question" className="w-full px-2 py-1 rounded"/>
        <div className="my-1 px-3 flex gap-2 bg-white items-center">
        <i className="ri-radio-button-line px-2"></i>
        <input type="text" className="flex-grow border-b-2 border-b-white outline-none focus:border-b-primary py-2"/>
        <li className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-gray-300 transition cursor-pointer"><i className="ri-image-2-fill"></i></li>
        </div>
      </div>


      {/* BOTTOM BAR */}
      <div className="p-3 rounded-md bg-white shadow mt-3">
        <ul className="flex gap-4 justify-center text-textColor">
          <li className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white transition cursor-pointer"><i className="ri-radio-button-line"></i></li>
          <li className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white transition cursor-pointer"><i className="ri-text"></i></li>
          <li className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white transition cursor-pointer"><i className="ri-image-2-fill"></i></li>
          <li className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white transition cursor-pointer"><i className="ri-checkbox-line"></i></li>
          <li className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white transition cursor-pointer"><i className="fa-solid fa-square-caret-down"></i></li>
        </ul>
      </div>
    </div>
  )
};

export default QuizManagement;