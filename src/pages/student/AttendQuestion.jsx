import { useState } from "react";

import Question from "../../components/classroom/student/Question";
import Notification from "../../components/common/Notification";

const AttendQuestion = () => {
  const [start, setStart] = useState();
  

  return (
    <>
      <Notification />
    <div className="px-5 py-3 md:py-3 lg:px-6 xl:px-14  min-h-[80vh] md:min-h-[90vh] flex justify-center items-center">
      {
        !start ? (
          <div className="text-center">
            <p className="text-center text-red-500 text-3xl md:text-5xl mb-2">Important</p>
            <p>Do to switch the tab</p>
            <p>Do to close the tab</p>
            <p>When you press the start the question submission will start.</p>
            <button className=" px-5 py-2 bg-green-500 overflow-hidden text-white" onClick={()=>setStart(true)}>start</button>
          </div>
        ) : (
          <div className="bg-tileColor p-5 w-full h-full rounded">
              <Question />
          </div>
        )
      }
    </div>
    </>
  )
};
export default AttendQuestion;