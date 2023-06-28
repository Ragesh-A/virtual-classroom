import { useEffect, useState } from 'react';
import organizerServices from '../../services/organizerServices';
import Shimmer from '../common/Shimmer';

const SelectClasses = ({ selectedClasses = [], setSelectedClasses }) => {
  const [classes, setClasses] = useState();
  const [filteredClasses, setFilteredClasses] = useState([])

  useEffect(() => {
    organizerServices.allClasses().then((res) => {
      if (res?.success) {
        setClasses(res?.success?.classes);
      }
    });
  }, []);

  const handleClassAdd = (singleClass) => {
    const isClassExist = selectedClasses.some(
      (existingClass) => existingClass._id === singleClass._id
    );
    if (!isClassExist){
      setSelectedClasses((prevClasses) => ([...prevClasses, singleClass]));
    }
  };

  const filterClass = (e) => {
    if (e.target.value === '') setFilteredClasses([])
    else {
        const filtered = classes.filter(single => single?.name.toLowerCase().includes(e.target.value.trim().toLowerCase()))
        setFilteredClasses(filtered)
    }
  }

  return (
    <>
    <div className="my-2">
      <input type="text" placeholder='search classes' onChange={filterClass} className='w-full px-2 outline-primary'/>
    </div>
    <div className="relative">
      <ul className="flex flex-col gap-1 mt-1 absolute w-full">
        {!filteredClasses && (
          <li className="max-h-[50px] overflow-hidden">
            <Shimmer />
          </li>
        )}
        {!filteredClasses && (
          <li className="max-h-[50px] overflow-hidden">
            <Shimmer />
          </li>
        )}
        {filteredClasses &&
          filteredClasses?.map((single) => (
            <li
              className="bg-white hover:bg-indigo-200  px-2"
              key={single?._id}
              onClick={() => handleClassAdd(single)}
            >
              {single?.name}
            </li>
          ))}
      </ul>
    </div>
    </>
  );
};

export default SelectClasses;
