import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import quizServices from "../../services/quizServices";
import Shimmer from "../../components/common/Shimmer";

const QuizManagement = () => {
  const { classId } = useParams()
  const [questions, setQuestions] = useState()
  const [selected, setSelected] = useState()



  useEffect(()=>{
    const promise = quizServices.getQuizzes(classId)
    promise.then(res=>{
      if (res?.success?.questions){
        setQuestions(res?.success?.questions)
      }
    }) 
  }, [])
  console.log(questions);
  if (!questions) return <Shimmer count={3} />

  return (
    <div className="flex flex-col gap-3">
      {
        questions?.map(question => (
          <div className={`bg-tileColor rounded-md p-3 overflow-hidden transition  ${selected === question?._id ? 'h-full' :  'h-12'}`} key={question?._id} onClick={()=>setSelected(question?._id)}>
            <div>
              <p className="font-bold text-md capitalize text-primary">{question?.title}</p>
              <p className="italic text-gray-500 tracking-wider my-2">{question?.description}</p>
            </div>
            <div className="p-2 bg-white text-textColor">
              <div>
                {
                  question.questions.map((singleQuestion, index) =>(
                    <div className="" key={`${question?.id}-${singleQuestion.type}-${index}`}>
                      <p className="my-2 mt-4"><span className="font-bold mr-2">{index + 1}.</span>{singleQuestion?.questionText} ?</p>
                      {
                        singleQuestion.type === 'text' ? null : (
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                            {
                              singleQuestion.options?.map(option =>(
                                <div className="px-3" key={option?.id}>
                                  {singleQuestion.type === 'radio' && <i className="ri-radio-button-line px-2"></i>}
                                  {singleQuestion.type === 'checkList' && <i className="ri-checkbox-line"></i>}
                                  <span>{option.option}</span>
                                </div>
                              ))
                            }
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        ))
      }
      <Link to={'create'} className="btn">create</Link>
    </div>
  )
};

export default QuizManagement;