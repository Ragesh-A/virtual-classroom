import { useState } from "react";
import JoinClassInput from "../common/JoinClassInput";
import CloseIcon from '@mui/icons-material/Close';
import CreateClassInput from "../common/CreateClassInput";

const CreateClass = ({visible, setVisible}) => {

  const [isJoin, setIsJoin] = useState(true)

  return (
    <>
    {visible && <div className="absolute top-0 w-full bg-black z-[1] bg-opacity-20 h-full flex items-center justify-center p-5">
      <div className="bg-primary md:min-w-[500px] max-w-[500px] rounded-t-lg transition">
        <div className=" flex w-full justify-end pe-3">
        <CloseIcon className="text-white cursor-pointer my-2" sx={{fontSize: '2rem'}} onClick={()=> setVisible(false)}/>
        </div>
        <div className="bg-white rounded-t-lg p-5 transition">
            <ul className="flex gap-3 font-bold text-textColor">
              <li className={`cursor-pointer ${isJoin ? 'border-b-[3px] border-primary' : ''}`} onClick={()=> setIsJoin(true)}>Join class</li>
              <li className={`cursor-pointer ${isJoin ? '' : 'border-b-[3px] border-primary'}`} onClick={()=> setIsJoin(false)}>Create class</li>
            </ul>
          {isJoin ? <JoinClassInput /> : <>
          <CreateClassInput name='name'/>
          <CreateClassInput name='description'/>
          <CreateClassInput name='image' type="file"/>
          </>}
        </div>
      </div>
    </div>}
    </>
  )
}

export default CreateClass;