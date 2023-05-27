import { useEffect, useState } from 'react';
import Shimmer from '../common/Shimmer';
import { useDispatch, useSelector } from 'react-redux';
import organizerServices from '../../services/organizerServices';
import { setClasses } from '../../utils/store/organizerSlice';
import { ErrorMessage } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';

const InstructorManagement = () => {
  const [fade, setFade] = useState();
  const [popUp, setPopUp] = useState(false);
  const [selectedClass, setSelectedClass] = useState(false);
  setTimeout(() => {
    setFade(true);
  }, 1000);

  const { classes } = useSelector((store) => store.organizer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!classes) {
      organizerServices.allClasses().then((res) => {
        dispatch(setClasses(res?.success?.classes));
        console.log(res.success);
      });
    }
  }, []);
  const handleSection = (classId) => {
    setPopUp(true);
    setSelectedClass(classId);
    console.log(classId);
  };

  if (!classes) {
    return (
      <>
        <Shimmer />
        <Shimmer />
        <Shimmer />
      </>
    );
  }

  return (
    <>
      <div
        className={`box p-5 rounded ${
          !fade ? 'opacity-0' : 'opacity-100'
        } transitions`}
      >
        <p className="text-center text-primary underline font-extrabold text-xl mb-5">
          Instructor management
        </p>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-white ">
                <span className="bg-lightPrimary block rounded p-2">#</span>
              </th>
              <th className="text-white ">
                <span className="bg-lightPrimary block rounded p-2">
                  instructor name
                </span>
              </th>
              <th className="text-white ">
                <span className="bg-lightPrimary block rounded p-2">
                  Classes
                </span>
              </th>
              <th className="text-white ">
                <span className="bg-lightPrimary block rounded p-2">
                  Action
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {classes &&
              classes?.map((singleClass, index) => (
                <tr key={singleClass?._id}>
                  <td>
                    <span className="py-2 bg-indigo-50 block rounded">
                      {index + 1}
                    </span>
                  </td>
                  <td>
                    <span className="py-2 bg-indigo-50 block rounded">
                      {singleClass?.uuid}
                    </span>
                  </td>
                  <td>
                    <span className="py-2 bg-indigo-50 block rounded">
                      {singleClass?.name}
                    </span>
                  </td>
                  <td className="flex">
                    <button
                      className="bg-lightPrimary hover:bg-primary text-white px-2 py-2 rounded w-full"
                      onClick={() => handleSection(singleClass?._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          type="button"
          className="btn overflow-hidden bg-primary text-white rounded-md mt-5"
          onClick={() => setPopUp(true)}
        >
          Add Instructor
        </button>
      </div>
      {popUp && (
        <AnimatePresence>
          <motion.div className="fixed top-0 left-0 w-full bg-black z-[1] bg-opacity-20 h-full flex items-center justify-center p-5 transition-colors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div id="pop" className="bg-primary md:min-w-[500px] max-w-[500px] rounded-t-lg" >
              <div className=" flex w-full justify-end pe-3">
                <i className="fa-solid fa-xmark text-white text-2xl cursor-pointer hover:animate-spin" onClick={()=>setPopUp(false)}></i>
              </div>
            <div className="bg-white p-3">
            <div className="flex flex-col md:flex-row mt-5 gap-3 py-5">
        <p>Enter the email or phone of to request to as instructor</p>
        <input
          type="text"
          name='nameOrEmail'
          className="bg-gray-200 rounded border-2 border-gray-300 px-2 py-2 focus:bg-blue-50 outline-primary"
          
        />
      </div>
      <button
        
        className="btn overflow-hidden bg-primary hover:bg-indigo-600 px-2 py-3 rounded text-white font-bold text-center shadow-sm shadow-shadow uppercase w-full mt-9"
      >
        request
      </button>
            </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {/* {slider&&<SingleClassManagement setState={setSlider} classid={selectedClass} />} */}
    </>
  );
};

export default InstructorManagement;
