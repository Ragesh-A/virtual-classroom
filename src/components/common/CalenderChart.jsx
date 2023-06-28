import './calenderChart.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import attendanceService from '../../services/attendanceService';
import ClassServices from '../../services/classServices';
import Shimmer from './Shimmer';

function filterData(att, userId) {
  return att?.map(obj => {
    const { createdAt, students } = obj;
    const studentData = students.find(student => student.student === userId);
    return { ...studentData, createdAt };
  });
}

const filterClass = (classes) => {
  return classes.map(x => x.classId);
};

const CalenderChart = () => {
  const [attendances, setAttendance] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [classes, setClasses] = useState();
  const [date, setDate] = useState();
  const { user } = useSelector(store => store.user);

  useEffect(() => {
    const fetchData = async () => {
      const res = await attendanceService.getAttendances(selectedClass);
      if (res?.success) {
        const filteredData = filterData(res?.success?.attendances, user?._id);
        setAttendance(filteredData);
      }
    };
    fetchData();
  }, [selectedClass, user?._id]);

  useEffect(() => {
    if (!classes) {
      const fetchData = async () => {
        const res = await ClassServices.getClasses(user?._id);
        if (res?.success) {
          setClasses(filterClass(res?.success?.classes));
        }
      };
      fetchData();
    } else {
      setSelectedClass(classes[0]?._id);
    }
  }, [classes, setClasses, user?._id]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setDate(currentDate);
  }, []);

  const handleSelection = e => {
    setSelectedClass(e.target.value);
  };

  if (!classes) return <Shimmer />

  return (
    <div className="h-full w-full">
      {classes && (
        <select name="" id="" onChange={handleSelection}>
          {classes?.map(x => (
            <option value={x?._id} key={x?._id}>
              {x?.name}
            </option>
          ))}
        </select>
      )}
      <div className="calender-grid w-full h-full  gap-1">
        {attendances &&
          attendances?.map(x => (
            <div
              className={`${x?.status ? 'bg-primary border-2 text-white' : 'bg-gray-300 border-2'} flex justify-center items-center text-[12px]`}
              key={x?._id}
            >
              {x?.createdAt}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalenderChart;
