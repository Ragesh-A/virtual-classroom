import { useState } from "react";
import JoinClassInput from "../common/JoinClassInput";
import CloseIcon from '@mui/icons-material/Close';
import CreateClassInput from "../common/CreateClassInput";

const CreateClass = ({visible}) => {

  const [isJoin, setIsJoin] = useState(true)

  return (
    <div className="absolute w-full bg-black bg-opacity-20 h-full flex items-center justify-center">
      <div className="bg-primary min-w-[500px] max-w-[500px] rounded-t-lg">
        <div className=" flex w-full justify-end pe-3">
        <CloseIcon className="text-white cursor-pointer my-2" sx={{fontSize: '2rem'}}/>
        </div>
        <div className="bg-white rounded-t-lg p-5">
            <ul className="flex gap-3 font-bold text-textColor">
              <li className="cursor-pointer" onClick={()=> setIsJoin(true)}>Join class</li>
              <li className="cursor-pointer" onClick={()=> setIsJoin(false)}>Create class</li>
            </ul>
          {isJoin ? <JoinClassInput /> : <>
          <CreateClassInput name='name'/>
          <CreateClassInput name='description'/>
          <CreateClassInput name='image' type="file"/>
          </>}
        </div>
      </div>
    </div>
  )
}

export default CreateClass;