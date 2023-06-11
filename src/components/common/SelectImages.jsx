import { useState } from "react";
import Div from "./Div";

const SelectImages = ({close, open, fileRef}) => {
  
  const [files, setFiles] = useState([])

  const fileChangeHandle = (e) => {
    console.log();
    const files = e.target.files
    console.log(files);
    if (files) {
      setFiles([...files]);
    }
  }


  return (
    <Div className={`${open ? 'xl:w-[430px] xl:px-4 xl:py-4 opacity-100' : 'w-0 h-0 overflow-hidden opacity-0'} fixed top-[50%] left-[50%] transform-center bg-white shadow  rounded`}>
      <p>Choose the files</p>
      <div action="#" className="border-dashed border-2 xl:h-28 flex justify-center items-center flex-col text-primary">
        <input type="file" name="image" id="image" multiple accept="image/*" className="hidden" ref={fileRef} onChange={fileChangeHandle}/>
        <label htmlFor="image" className="text-center">
          <i className="ri-upload-cloud-2-fill xl:text-5xl"></i>
          <p>Browse Files to Upload</p>
        </label>
      </div>
      <section className="overflow-y-scroll scroll max-h-[250px]">
        {files.map(e=>(
          <li className="bg-indigo-100 mt-2 list-none xl:p-3 flex items-center xl:gap-3 rounded" key={e.name}>
          <i className="ri-file-3-fill xl:text-2xl text-primary"></i>  
          <div className="w-full">           
            <div className="text-gray-800 flex justify-between w-full">
              <span>{e.name}</span>
              <span>{((e.size/1024)/1024).toFixed(2) +' MB'}</span>
            </div>            
            <div className="h-1 w-full mt-2 rounded bg-white">             
              <div className="h-full w-0 bg-primary rounded progress-bar"></div>
            </div>
          </div>
          </li>
        )) }
      </section>
      <button onClick={close} className="float-right bg-primary  px-5 py-1 text-white mt-3 rounded-md">select</button>
    </Div>
  )
};

export default SelectImages;