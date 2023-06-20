import { useParams } from "react-router-dom";
import Section from "../../layouts/Section"
import './DiscussionPanel.css'
import { useEffect } from "react";
import classServices from "../../../services/classServices";

const DiscussionPanel = () => {

  const { classId } = useParams();
  useEffect(()=>{
    classServices.getClass(classId)
  }, [classId])
  
  return(
    <Section className="relative" >
      <div className="bg-blue-50 p-5 rounded-t-2xl">Discussion</div>
      <ul>

        <li className="border-2 border-blue-100 p-2 rounded px-3 mt-2 flex gap-5 transition  hover:shadow-md hover:shadow-blue-100">
          <div className="w-[5rem] h-[5rem] bg-indigo-400 rounded-full"></div>
          <div className="">
            <p className="font-bold text-textColor">Name</p>
            <p className="text-gray-600">message goes here</p>
          </div>
        </li>

        <li className="border-2 border-blue-100 p-2 rounded px-3 mt-2 flex gap-5 transition  hover:shadow-md hover:shadow-blue-100">
          <div className="w-[5rem] h-[5rem] bg-indigo-400 rounded-full"></div>
          <div className="">
            <p className="font-bold text-textColor">Name</p>
            <p className="text-gray-600">message goes here</p>
          </div>
        </li>

        <li className="border-2 border-blue-100 p-2 rounded px-3 mt-2 flex gap-5 transition  hover:shadow-md hover:shadow-blue-100">
          <div className="w-[5rem] h-[5rem] bg-indigo-400 rounded-full"></div>
          <div className="">
            <p className="font-bold text-textColor">Name</p>
            <p className="text-gray-600">message goes here</p>
          </div>
        </li>

        <li className="border-2 border-blue-100 p-2 rounded px-3 mt-2 flex gap-5 transition  hover:shadow-md hover:shadow-blue-100">
          <div className="w-[5rem] h-[5rem] bg-indigo-400 rounded-full"></div>
          <div className="">
            <p className="font-bold text-textColor">Name</p>
            <p className="text-gray-600">message goes here</p>
          </div>
        </li>

        <li className="border-2 border-blue-100 p-2 rounded px-3 mt-2 flex gap-5 transition  hover:shadow-md hover:shadow-blue-100">
          <div className="w-[5rem] h-[5rem] bg-indigo-400 rounded-full"></div>
          <div className="">
            <p className="font-bold text-textColor">Name</p>
            <p className="text-gray-600">message goes here</p>
          </div>
        </li>
        
      </ul>
    </Section>
  )
};

export default DiscussionPanel;