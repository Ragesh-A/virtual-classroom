import { useEffect, useState } from 'react';
import Section from '../../layouts/Section';
import quizServices from '../../../services/quizServices';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ data = [] }) => {
  const [question, setQuestion] = useState(data);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswer] = useState({})
  const [selected, setSelected] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    setQuestion(data);
  }, [data]);

  const handleAnswerSelection = (index) => {
    if (selected === false) {
      setSelected(index);
      setAnswer(prev => {
        prev[questionIndex] = index;
        return prev;
      })
    }
    if (index === question?.questions[questionIndex]?.answer) {
      setTotalScore(
        (prev) => (prev += Number(question?.questions[questionIndex]?.score))
      );
    }
  };

  const handelNextOption = () => {
    if (!(questionIndex < question.questions.length - 1) && (selected !== false)) {
      quizServices.submitAnswer(question._id, {answers}).then(res =>{
        if (res?.success) {
          navigate(-2)
        }
      })

    }
    else if (selected !== false) {
      setSelected(false)
      setQuestionIndex(prev => prev+=1)
    }
  };

  return (
    <Section className="">
      <div className="shadow p-2 px-4 rounded max-w-2xl mx-auto my-5">
        <div className="flex flex-wrap justify-between">
          <p className="font-bold text-textColor capitalize">
            {question?.title}
          </p>
          <p>timer</p>
        </div>
        <p className="my-2">{question?.description}</p>
        <div className="flex justify-between">
          <p>
            Question{' '}
            <span className="text-primary font-bold">{questionIndex + 1}</span>{' '}
            of
            <span className="font-bold"> {question?.questions?.length}</span>
          </p>
          <p>{totalScore}</p>
        </div>
        <br />
        <div className="">
          <div className="shadow px-4">
            {question?.questions[questionIndex]?.questionText}
          </div>
          {question?.questions[questionIndex].options.map((option, i) => (
            <button
              className={`shadow p-2 rounded mt-3 block w-full text-left px-3 $ ${
                (i === selected) ? 
                (selected === question?.questions[questionIndex]?.answer) ?
                'bg-green-400 text-white' : 'bg-red-400 text-white' : ''
              }`}
              key={option.id}
              disabled={selected !== false}
              onClick={() => handleAnswerSelection(i)}
            >
              {option?.option}
            </button>
          ))}
          <button
            className={`w-full ${selected === false ? 'bg-gray-400' : 'bg-primary'}  text-white py-1 mt-3 rounded uppercase font-mono`}
            disabled={selected === false}
            onClick={handelNextOption}
          >
            next
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Quiz;
