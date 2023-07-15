import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../../components/common/Shimmer';
import quizServices from '../../services/quizServices';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';

const QuestionManagement = () => {
  const [questions, setQuestion] = useState();
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    quizServices.getQuizzesByOrg().then((res) => {
      if (res?.success) {
        setQuestion(res?.success?.questions);
      } else {
        dispatch(setNotification({ success: false, message: res?.error }));
      }
    });
  }, [dispatch]);

  if (!questions) return <Shimmer count={3} />;
  return (
    <>
      <div className="flex flex-col gap-2 py-3">
        {questions?.map((question) => (
          <div className={`bg-tileColor overflow-hidden px-2  py-1 rounded ${selected === question?._id ? 'h-full' : 'h-[2rem]'}`} onClick={()=>setSelected(question?._id)} key={question?._id}>
            <div className="flex justify-between flex-wrap">
              <p className="text-textColor font-bold  font-mono capitalize">
                {question?.title}
              </p>
              <p className='px-2 py-1'>{question?.date}</p>
            </div>
            <p>{question?.description}</p>
            <div className="p-2">
              <dl className="bg-white px-2 rounded">
                {question.questions?.map((singleQuestion, index) => (
                  <div className="mt-3" key={singleQuestion?.id}>
                    <dt>{singleQuestion?.questionText}</dt>
                    {
                      singleQuestion.options?.map((option, index) => (
                        <dd key={option.id} className={`${index === singleQuestion.answer && 'bg-primary text-white'} px-2`}>{option.option}</dd>
                      ))
                    }
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="create"
        className="px-4 rounded absolute bottom-10 right-10 border-2 py-2 overflow-hidden text-white bg-primary "
      >
        <span className="md:hidden">+</span>{' '}
        <span className="hidden md:flex">create new question</span>
      </Link>
    </>
  );
};

export default QuestionManagement;
