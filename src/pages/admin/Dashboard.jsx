import { useEffect, useState } from "react";
import classBackground from '../../assets/images/classroom.png'
import usersImage from '../../assets/images/users.png'
import subscriberImage from '../../assets/images/subscribe.png'
import LineChart from "../../components/chart/LIneChart";
import PieChart from "../../components/chart/PieChart";
import BarChart from "../../components/chart/BarChart";
import adminServices from "../../services/admin.service";
import TotalAmountCard from "../../components/Admin/TotalAmountCard";
import chartServices from "../../services/chartService";


const Dashboard = () => {

  const [reports, setReports] = useState()
  const [lineChartData, setLineChartData] = useState()
  const [pieChartData, setPieChartData] = useState()



  useEffect(()=>{
    adminServices.getDashboard().then(res => {
      if (res.success) {
        setReports(res?.success?.data);
        const purchaseAndAmount = chartServices.totalPlanAndAmount(res?.success?.data?.subscriptions)
        const planRatio = chartServices.planRatio(res?.success?.data?.subscriptions)
        setPieChartData(planRatio)
        setLineChartData(purchaseAndAmount)
      }
    })


  }, [])

  return (
    <div className="flex flex-col xl:flex-row h-full gap-2">

      <div className="flex-grow">
{/* main */}
        <div className="flex flex-col md:flex-row gap-3">
          
          <div className=" flex gap-2 flex-col flex-grow">

            <div className="flex-1 justify-between p-1 flex gap-2">
              <div className="box rounded flex-1 py-5 px-1 md:px-3">
                <div className="grid place-items-center">
                <img src={usersImage} alt="users" className="max-w-[40px] md:max-w-[70px]"/>
                </div>
                <div className="text-center md:text-2xl font-bold text-textColor mt-3">
                  <p>Users</p>
                  <p className="text-primary">{reports?.usersCount}</p>
                </div>
              </div>
              <div className="box rounded flex-1 py-5 px-1 md:px-3">
                <div className="grid place-items-center">
                  <img src={classBackground} alt="classes" className="max-w-[40px] md:max-w-[70px]"/>
                </div>
                <div className="text-center md:text-2xl font-bold text-textColor mt-3">
                  <p>Classes</p>
                  <p className="text-primary">{reports?.classesCount}</p>
                </div>
              </div>
              <div className="box rounded flex-1 py-5 px-1 md:px-3">
                <div className="grid place-items-center">
                <img src={subscriberImage} alt="subscription" className="max-w-[40px] md:max-w-[70px]"/>
                </div>
                <div className="text-center md:text-2xl font-bold text-textColor mt-3">
                  <p>Subscribers</p>
                  <p className="text-primary">{reports?.subscribersCount}</p>
                </div>
              </div>

              
            </div>
{/* 
            <div className="box flex-1 p-1 h-[20rem] md:h-[10rem] flex justify-center">
              <BarChart />
            </div> */}
          </div>
        </div>
    
        <div className="box bg-green-500 xl:h-[15.5rem] mt-2 flex flex-col xl:flex-row rounded-md">
         { lineChartData && <LineChart text="Subscriptions" arrayOfData={lineChartData}/>}
          <div className="flex-grow flex justify-center max-h-[350px]">
           {pieChartData && <PieChart text='Purchase Count' labelAndValue={pieChartData}/>}
          </div>
        </div>

      </div>

      <div className="md:w-[250px]">
        <TotalAmountCard subscriptions={reports?.subscriptions}/>
      </div>

    </div>
  );
};

export default Dashboard;
