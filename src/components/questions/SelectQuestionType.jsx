import React, { useState } from 'react';

const SelectQuestionType = ({ setSelected }) => {
  const [selectedType, setSelectedType] = useState('quiz');

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleCreateButtonClick = () => {
    setSelected(selectedType);
  };

  return (
    <div className="box p-2 rounded min-h-[250px] flex flex-col py-3">
      <div className="flex-grow">
        <p className="text-primary text-center font-semibold">
          Selected Question Type
        </p>
        <div className="flex flex-col min-h-[150px] justify-center items-center">
          <div className="">
          <div>
          <input
            type="radio"
            name="type"
            id="quiz-radio"
            value="quiz"
            checked={selectedType === 'quiz'}
            onChange={handleTypeChange}
          />
          <label htmlFor="quiz-radio" className='text-xl font-bold ml-3'>Quiz</label>
        </div>
        <div>
          <input
            type="radio"
            name="type"
            id="exam-radio"
            value="exam"
            checked={selectedType === 'exam'}
            onChange={handleTypeChange}
          />
          <label htmlFor="exam-radio" className='text-xl font-bold ml-3'>Exam</label>
        </div>
          </div>
        </div>
      </div>
      <button
        className="w-full text-white bg-primary mt-3 py-1 rounded"
        onClick={handleCreateButtonClick}
      >
        create
      </button>
    </div>
  );
};

export default SelectQuestionType;
