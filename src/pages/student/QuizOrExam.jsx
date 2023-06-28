import { useEffect, useState } from "react";
import quizServices from "../../services/quizServices";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotification } from "../../utils/store/uiSlice";
import Quiz from "../../components/classroom/student/Quiz";
import Shimmer from "../../components/common/Shimmer";
import Question from "../../components/classroom/student/Question";

const QuizOrExam = () => {

  const { questionId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [question, setQuestion] = useState();
  let interval;

  useEffect(() => {
    
    quizServices.isSubmitted(questionId).then(res => {
      if (res?.success?.isSubmitted) {
        dispatch(setNotification({ success: false, message: 'You already attended'}))
        navigate(-1)
      }

      if (!(res?.success?.isSubmitted)) {
        quizServices.getQuestion(questionId).then((res) => {
          if (res?.success?.question) {
            setQuestion(res?.success?.question);
            // startTimer()
          }
          if (res?.error) {
            dispatch(
              setNotification({ success: false, message: 'No such Questions' })
            );
            navigate(-1);
          }
        });
      }
    }) 

    return () => {
      if (interval){
        clearInterval(interval)
      }
    }
  }, [dispatch, navigate, questionId]);

  if (!question)
    return (
      <div className="px-3">
        <Shimmer count={3} />
      </div>
    );

  if (question?.type === 'quiz') return <Quiz data={question} />
  else return <Question data={question} />
}

export default QuizOrExam;