import { useEffect, useState } from "react";
import Shimmer from "../../components/common/Shimmer";
import { useParams } from "react-router-dom";
import quizServices from "../../services/quizServices";
import { useDispatch } from "react-redux";
import { setNotification } from "../../utils/store/uiSlice";

const AttendQuestion = () => {
  const [question, setQuestion] = useState();
  const [start, setStart] = useState();
  const { questionId } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
     quizServices.getQuestion(questionId).then(res => {
      if (res?.success?.question) {
        console.log(res);
        setQuestion(res.success.question)
      }else{
        dispatch(setNotification({ success: false, message: res?.error || 'no such questions'}))
      }
    })
  }, [questionId])


  return (
    <div className="px-5 md:py-3 lg:px-6 xl:px-14">
      {
        !start ? (
          <div className="text-center">
            <p className="text-center text-red-500 text-3xl md:text-5xl mb-2">Important</p>
            <p>Do to switch the tab</p>
            <p>Do to close the tab</p>
            <p>When you press the start the question submission will start.</p>
            <button className="btn bg-green-500 overflow-hidden" onClick={()=>setStart(true)}>start</button>
          </div>
        ) : (
          <div className=""></div>
        )
      }
    </div>
  )
};
export default AttendQuestion;