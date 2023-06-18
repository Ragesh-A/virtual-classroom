import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../../utils/store/uiSlice";
import quizServices from "../../services/quizServices";
import { useNavigate, useParams } from "react-router-dom";

const CreateQuestion = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [time, setTime] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const { classId } = useParams();
  const navigate = useNavigate()

  const newQuestion = (type) => {
    let question = { questionText: '', options: [{ id: 1, option: '' }, { id: 2, option: '' }] };
    switch (type) {
      case 'radio':
        question.type = 'radio';
        break;
      case 'checkList':
        question.type = 'checkList';
        break;
      default:
        question.type = 'text';
    }
    setQuestions(prev => [...prev, question]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length < 2) return;
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const addOption = (index) => {
    setQuestions(prev => {
      const updatedQuestions = [...prev];
      const length = updatedQuestions[index]?.options.length;
      const id = updatedQuestions[index]?.options[length - 1]?.id;
      updatedQuestions[index]?.options.push({ id: id + 1, option: '' });
      return updatedQuestions;
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    if (questions[questionIndex]?.options.length <= 2) return;
    setQuestions(prev =>
      prev.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            options: question.options.filter(opt => opt.id !== optionIndex),
          };
        }
        return question;
      })
    );
  };

  const handleQuestionTextChange = (index, text) => {
    setQuestions(prev => {
      const updatedQuestions = [...prev];
      updatedQuestions[index].questionText = text;
      return updatedQuestions;
    });
  };

  const handleOptionTextChange = (questionIndex, optionIndex, text) => {
    setQuestions(prev => {
      const updatedQuestions = [...prev];
      updatedQuestions[questionIndex].options[optionIndex].option = text;
      return updatedQuestions;
    });
  };

  const handleSubmit = () => {
    if (!quizDescription || !quizTitle) {
      dispatch(setNotification({ success: false, message: 'Please fill the question title and description.' }));
      return;
    }

    if (questions.length < 1) {
      dispatch(setNotification({ success: false, message: 'At least one question should be needed.' }));
      return;
    }
    
    const isAnyEmpty = questions.some(ques => {
      if (!ques.questionText) return true;
      if (ques.type === 'text') return false;
      return ques.options.some(option => !option.option);
    });

    if (isAnyEmpty) {
      dispatch(setNotification({ success: false, message: 'Please fill in all the questions and options.' }));
      return;
    }

    quizServices.createQuiz({ classId: [classId], date: time, title: quizTitle, description: quizDescription, questions })
      .then(res => {
        if (res?.success) {
          navigate(-1)
        }
        if (res?.error) {
          dispatch(setNotification({ success: false, message: res?.error }));
        }
      });
  };

  const today = () => {
    const date = new Date().toISOString().split('T')[0];
    return date;
  };

  useEffect(() => {
    setTime(today());
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="p-3 md:p-4 xl:p-5 rounded-md bg-tileColor">
        <p className="uppercase text-primary tracking-wider mb-2 font-bold">Create new</p>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between gap-2">
            <input
              type="text"
              placeholder="Untitled"
              className="px-2 py-2e rounded-md text-xl outline-none border-2 border-transparent border-b-primary flex-1"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
            <input
              type="date"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-2 py-2e rounded-md outline-none border-2 border-transparent border-b-primary flex-1"
            />
          </div>
          <textarea
            type="text"
            placeholder="Quiz description"
            className="px-2 py-2 rounded-md outline-none text-sm border-2 border-transparent border-b-primary"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
          />
        </div>
      </div>

      {questions.map((ques, index) => (
        <div className="bg-tileColor p-3 md:p-4 xl:p-5 rounded-md flex" key={index + ques.type}>
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Question"
              className="w-full px-2 py-1 rounded outline-orange-500"
              onChange={(e) => handleQuestionTextChange(index, e.target.value)}
            />
            {ques.options.map((option, i) =>
              ques.type === 'text' ? null : (
                <div className="my-1 px-3 flex gap-2 bg-white items-center" key={`${index}-${ques.type}-${option?.id}`}>
                  {ques.type === 'radio' && <i className="ri-radio-button-line px-2"></i>}
                  {ques.type === 'checkList' && <i className="ri-checkbox-line"></i>}
                  <input
                    type="text"
                    className="flex-grow border-b-2 border-b-white outline-none focus:border-b-primary py-2 form-inp"
                    onChange={(e) => handleOptionTextChange(index, i, e.target.value)}
                  />
                  <li className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-gray-300 transition cursor-pointer">
                    <i className="ri-close-fill" onClick={() => removeOption(index, option?.id)}></i>
                  </li>
                </div>
              )
            )}
            {ques.type !== 'text' && (
              <p>
                need to <span className="text-primary" onClick={() => addOption(index)}>add more</span>
              </p>
            )}
          </div>
          <div className="grid place-items-center ps-3">
            <i
              className="ri-delete-bin-5-fill hover:bg-red-500 hover:text-white p-1 rounded-md"
              onClick={() => handleRemoveQuestion(index)}
            ></i>
          </div>
        </div>
      ))}

      <div className="px-1 py-2 mt-3">
        <ul className="flex w-full rounded-md bg-white shadow py-3 gap-4 justify-center text-textColor">
          <li
            className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white transition cursor-pointer"
            onClick={() => newQuestion('radio')}
          >
            <i className="ri-radio-button-line"></i>
          </li>
          <li
            className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white transition cursor-pointer"
            onClick={() => newQuestion('text')}
          >
            <i className="ri-text"></i>
          </li>
          <li
            className="rounded-full bg-tileColor w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white transition cursor-pointer"
            onClick={() => newQuestion('checkList')}
          >
            <i className="ri-checkbox-line"></i>
          </li>
        </ul>
      </div>
      <button type="button" className="btn bg-primary text-white rounded-md overflow-hidden" onClick={handleSubmit}>
        CREATE
      </button>
    </div>
  );
};

export default CreateQuestion;
