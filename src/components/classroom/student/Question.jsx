import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import quizServices from '../../../services/quizServices';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../../utils/store/uiSlice';
import Shimmer from '../../common/Shimmer';
import Section from '../../layouts/Section';
import Quiz from './Quiz';
import Notification from '../../common/Notification';

const Question = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [question, setQuestion] = useState();
  const { questionId } = useParams();
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [seconds, setSeconds] = useState(totalSeconds);
  const [answers, setAnswers] = useState({});
  let interval;

  const startTimer = () => {
    interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  };

  useEffect(() => {
    setQuestion(data);
    startTimer()
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [data]);


  useEffect(() => {
    if (seconds < totalSeconds) {
      let remainingSeconds = totalSeconds - seconds;
      let minutes = Math.floor(remainingSeconds / 60);
      let remainingSecondsFormatted = remainingSeconds % 60;

      document.title = `Time Remaining: ${minutes}:${String(
        remainingSecondsFormatted
      ).padStart(2, '0')}`;
    }
  }, [seconds, totalSeconds]);

  const handleSubmit = () => {
    const allQuestionAnswered = question?.questions?.every((ques, index) => {
      return answers.hasOwnProperty(index);
    });

    if (allQuestionAnswered) {
      quizServices
        .submitAnswer(questionId, { answers, timeTaken: seconds })
        .then((res) => {
          console.log(res);
          if (res?.error) {
            dispatch(setNotification({ success: false, message: res?.error }));
          }
          if (res?.success) {
            dispatch(
              setNotification({
                success: true,
                message: 'You are answer is submitted.',
              })
            );
            navigate(-1);
          }
        });
    } else {
      dispatch(
        setNotification({
          success: false,
          message: 'Are you sure submit without attending all questions',
        })
      );
    }
  };

  const handleSelection = (e, ques, index) => {
    const selectedOptionId = e.target.value;
    const newAnswers = { ...answers };
    if (ques.type === 'radio') {
      newAnswers[index] = selectedOptionId;
    } else if (ques.type === 'checkbox') {
      if (newAnswers[index]) {
        // Toggle the selection for checkbox
        const selectedIndex = newAnswers[index].indexOf(selectedOptionId);
        if (selectedIndex > -1) {
          newAnswers[index].splice(selectedIndex, 1);
        } else {
          newAnswers[index].push(selectedOptionId);
        }
      } else {
        newAnswers[index] = [selectedOptionId];
      }
    }
    setAnswers(newAnswers);
  };

  if (!question)
    return (
      <div className="px-3">
        <Shimmer count={3} />
      </div>
    );

  if (question?.type === 'quiz') return <Quiz data={question} />;

  return (
    <Section className="mb-5">
      <Notification />
      <p className="font-bold text-gray-500 text-right">{`${Math.floor(
        seconds / 3600
      )
        .toString()
        .padStart(2, '0')}:${Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}s`}</p>
      <h2 className="text-center text-primary font-bold capitalize text-xl  mb-2 underline">
        {question?.title}
      </h2>
      <p className="text-gray-500 text-justify  mb-5">{question.description}</p>

      <dl>
        {question?.questions?.map((ques, index) => (
          <div className="" key={ques?.type + index}>
            <dt className="font-bold text-gray-600">
              <span className="text-md font-bold">{index + 1}.</span>
              <span>{ques.questionText}</span>
            </dt>

            {ques?.type === 'text' ? (
              <dd className="px-4 py-2">
                <textarea
                  type="text"
                  className="w-full md:p-3 text-textColor outline-none rounded"
                  name={index}
                  id={index}
                  onChange={(e) => {
                    const newAnswer = { ...answers };
                    newAnswer[index] = e.target.value;
                    setAnswers(newAnswer);
                  }}
                />
              </dd>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 px-4 py-2 mb-2">
                {ques?.options?.map((option, i) => (
                  <dd
                    key={option?.id + ques?.type}
                    className="flex items-center gap-2"
                  >
                    <input
                      type={ques.type}
                      name={`${index}-${ques?.type}`}
                      id={`${index}-${ques?.type}-${option?.id}`}
                      value={option?.id}
                      onChange={(e) => handleSelection(e, ques, index)}
                    />
                    <label
                      htmlFor={`${index}-${ques?.type}-${option?.id}`}
                      className="cursor-pointer min-w-[50px] text-[1rem] "
                    >
                      {option?.option}
                    </label>
                  </dd>
                ))}
              </div>
            )}
          </div>
        ))}
      </dl>
      <button
        className="w-full text-white bg-primary py-1 rounded mt-3"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </Section>
  );
};

export default Question;
