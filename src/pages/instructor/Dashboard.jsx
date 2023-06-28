import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import lectureServices from '../../services/lectureServices';

const Dashboard = () => {
  const { currentClass } = useSelector((store) => store.classes);
  const { classId } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    lectureServices.getDashboard(classId).then((res) => {
      if (res?.success?.data) {
        setData(res?.success?.data);
      }
    });
  }, []);

  return (
    <div>

      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
        <div className="bg-primary text-white border-2 border-white md:p-4 rounded-md text-center p-2">
          <p className="text-xl font-bold">Class code</p>
          <p>{currentClass?.class?.uuid}</p>
        </div>
        <div className="bg-tileColor border-2 border-white md:p-4 rounded-md flex items-center gap-6 p-2">
          <i className="ri-graduation-cap-fill md:text-5xl hidden md:block"></i>
          <div className="text-center flex-grow">
            <h5 className="uppercase font-bold text-center md:text-left">Students</h5>
            <p className="text-primary font-bold  text-xl">
              {currentClass?.students?.length}
            </p>
          </div>
        </div>

        <div className="bg-tileColor text-textColor border-2 border-white md:p-4 rounded-md text-center p-2">
          <p className="text-xl font-bold">Question created</p>
          <p className="text-primary font-bold  text-xl">
            {data?.questionsCount}
          </p>
        </div>
        <div className="bg-tileColor text-textColor border-2 border-white md:p-4 rounded-md text-center p-2">
          <p className="text-xl font-bold">Assignments count</p>
          <p className="text-primary font-bold  text-xl">
            {data?.totalAssignmentsCount}
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {
          data?.todayAnnouncements.length === 0 ? <div className='p-2 font-bold text-textColor min-h-[15rem] flex justify-center items-center'>No Announcements today</div> : 
          data?.todayAnnouncements?.map(announcement => (
            <div className="bg-tileColor text-textColor p-2 flex flex-col gap-3 rounded-md px-4" key={announcement?._id}>
              <p className='text-xl font-bold '>{announcement?.title} <span className='float-right text-sm font-normal'>{announcement?.announceAt}</span></p>
              <p>{announcement?.description}</p>
              
            </div>
          ))
 
        }
      </div>
    </div>
  );
};

export default Dashboard;
