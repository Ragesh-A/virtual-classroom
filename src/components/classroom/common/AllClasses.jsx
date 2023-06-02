import { useEffect, useState } from 'react';
import Section from '../../layouts/Section';
import ClassCards from './ClassCards';
import classServices from '../../../services/classServices';
import { useDispatch, useSelector } from 'react-redux';
import { storeClasses } from '../../../utils/store/classesSlice';
import { setNotification } from '../../../utils/store/uiSlice';

const AllClasses = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const storeClass = useSelector((store) => store.classes);

  useEffect(() => {
    classServices
      .getAllClasses()
      .then((res) => {
        if (res?.classes) {
          dispatch(storeClasses(res.classes));
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        dispatch(setNotification({ success: false, message: err.message }));
      });
  }, []);

  return (
    <>
      <Section>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!isLoaded ? (
            Array(3)
              .fill()
              .map((e, index) => (
                <div
                  className="shim overflow-hidden shadow max-w-[500px] h-[250px] relative"
                  key={index}
                >
                  <div className="flex h-3/5 bg-gray-200"></div>
                  <div className="px-5 py-1 relative before:absolute before:content-[''] before:w-[150%] before:h-[5rem] before:-top-4 before:-left-4 before:rotate-3 md:before:rotate-6 before:bg-white ">
                    <div className="absolute right-8 top-[-3rem] w-[80px] h-[80px] bg-gray-300" />
                    <p className="font-bold text-textColor"></p>
                    <p className="mt-2 text-sm text-textColor"></p>
                  </div>
                </div>
              ))
          ) : (
            <ClassCards classes={storeClass?.classes} />
          )}
        </div>
      </Section>
    </>
  );
};

export default AllClasses;
