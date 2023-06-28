import { useEffect, useState } from 'react';
import lectureServices from '../../services/lectureServices';
import { useParams } from 'react-router-dom';
import Shimmer from '../../components/common/Shimmer';
// import quizServices from '../../services/quizServices';
import Avatar from '../../components/common/Avatar';

const ViewQuestionAnswers = () => {
  const [submissions, setSubmissions] = useState();
  const { classId, questionId } = useParams();
  const [selected, setSelected] = useState();


  useEffect(() => {
    lectureServices.allQuestionSubmission(questionId).then((res) => {
      console.log(res);
      setSubmissions(res?.success?.submissions);
    });
  }, [classId, questionId]);

  if (!submissions) return <Shimmer count={3} />;
  // const handelAccept = (id) => {
  //   quizServices.Accept();
  // };

  return (
    <div className="mb-5">
      {submissions?.map((doc) => (
        <div className={`bg-tileColor p-2 rounded overflow-hidden border-2 border-white hover:shadow ${doc._id === selected ? 'h-full': 'h-14'}`} key={doc._id} onClick={()=>setSelected(doc?._id)}>
          <div className="flex justify-between  items-center">
            <p className="flex gap-3 items-center">
              <Avatar image={doc.student.avatar} />
              <span className='font-bold capitalize text-textColor'>{doc?.student?.name}</span>
            </p>
            <span>{doc?.timeTaken / 60}s</span>
          </div>
          <div className="">
          {
            doc?.question?.questions?.map((singleQuestion, index) => (
              <div className="bg-white p-4" key={index + singleQuestion.type}>
                <p><span className='font-bold text-textColor mr-2'>{'Q'}</span>{singleQuestion.questionText}</p>
                <ul className='grid grid-cols-4 px-3'>
                  {
                    singleQuestion.options.map((option, i) =>(
                      <li key={option.id + index + singleQuestion.type }>{i+1}. {option?.option}</li>
                    ))
                  }
                </ul>
                <p className='bg-green-400 px-2'>answer: {`${doc.answer[0][index]}`}</p>
              </div>
            ))
          }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewQuestionAnswers;
