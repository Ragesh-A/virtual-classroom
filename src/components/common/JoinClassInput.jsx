import { useRef } from 'react';
import classServices from '../../services/classServices';

const JoinClassInput = () => {
  const inp = useRef();
  function formHandle(e) {
    console.log();
    const value = inp.current.value.trim();
    if (value) {
      classServices.joinClass(value);
    }
  }
  return (
    <>
      <div className="flex flex-col md:flex-row mt-5 gap-3 py-5">
        <p>Ask your lecture for the class code, then enter it here.</p>
        <input
          type="text"
          className="bg-gray-200 rounded border-2 border-gray-300 px-2 py-2 focus:bg-blue-50 outline-primary"
          ref={inp}
        />
      </div>
      <button
        onClick={formHandle}
        className="btn overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase w-full mt-9"
      >
        Join
      </button>
    </>
  );
};

export default JoinClassInput;
