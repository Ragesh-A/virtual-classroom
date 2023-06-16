import { useState } from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col xl:flex-row h-full gap-2">

      <div className="flex-grow">
{/* main */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="bg-gradient-to-tr p-3  from-primary to-lightPrimary w-full h-[4rem] md:h-[25rem] md:w-[350px] rounded-md text-white">
            <p className="md:text-center text-4xl font-bold ">Hi Rhtere</p>
          </div>
          <div className=" flex gap-2 flex-col flex-grow">
            <div className="box flex-1 p-1">hgf</div>
            <div className="box flex-1 p-1">hgf</div>
          </div>
        </div>
    
        <div className="box bg-green-500"></div>

      </div>

      <div className="md:w-[250px]">
        <div className="box"></div>
      </div>

    </div>
  );
};

export default Dashboard;
