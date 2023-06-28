import { useEffect, useState } from "react";
import quizServices from "../../services/quizServices";
import { useParams } from "react-router-dom";
import Shimmer from "../../components/common/Shimmer";
import AttendQuestion from "./AttendQuestion";

const ListQuestions = () => {

  const [questions, setQuestions] = useState();
  const { classId } = useParams()
  const today = new Date().toISOString().split('T')[0];
  const [attendQuestion, setAttendQuestion] = useState(false)

  useEffect(()=>{
    quizServices.getQuizzes(classId).then(res => {
      setQuestions(res?.success?.questions);
    })
  }, [classId])
  

  if (attendQuestion) return <AttendQuestion selected={attendQuestion}  back={()=>setAttendQuestion(false)}/>

  return (
    <div className="flex flex-col gap-2 mb-16 md:mb-0">
      {
        !questions ? <Shimmer /> : (
          questions?.map(question => {
            if (question.date > today) {
              return false;
            }else if (question.date === today) {
              return <div key={question?._id} className="bg-tileColor p-2">
                <p>{question?.title}</p>
                <p>{question?.description}</p>
                <button onClick={()=>setAttendQuestion(question)}>attend</button>
                </div>
            }else {
              return <div key={question?._id} className="bg-red-100 p-2 rounded-md">
                <p>{question?.title}</p>
                <p>{question?.description}</p>
              </div>
            }
          })
        )
      }
    </div>
  )
};

export default ListQuestions;