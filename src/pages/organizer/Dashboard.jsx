import { useEffect } from 'react';
import { useState } from 'react';
import organizerServices from '../../services/organizerServices';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [totalClasses, setTotalClasses] = useState(0);
  const [organization, setOrganization] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    navigate('instructors/')
    organizerServices.getDashboard().then((res) => {
      console.log(res);
      setTotalClasses(res?.success?.data?.totalClasses);
      setOrganization(res?.success?.data?.organization)
    });
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-2">
        <div className="box p-2 rounded-md">{totalClasses}</div>
        <div className="box p-2 rounded-md">{organization?.instructors.length}</div>
      </div>
      


    </div>
  );
};

export default Dashboard;
