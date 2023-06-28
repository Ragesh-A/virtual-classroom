import { useParams } from "react-router-dom";
import Section from "../../layouts/Section"
import './DiscussionPanel.css'
import { useEffect, useState } from "react";
import classServices from "../../../services/classServices";
import Announcements from "./Announcements";
import Avatar from "../../common/Avatar";
import Shimmer from "../../common/Shimmer";

const DiscussionPanel = () => {

  const { classId } = useParams();

  const [messages, setMessgaes] = useState();

  useEffect(()=>{
    // classServices.getClass(classId)
  }, [classId])
  
  return(
    <Section className="relative" >
      <Announcements />
      <div className="bg-blue-50 p-5 rounded-t-2xl">Discussion</div>
      <ul>
        {!messages && <Shimmer />}
        <li className="border-2 border-blue-100 p-2 rounded px-3 mt-2 flex gap-5 transition  hover:shadow-md hover:shadow-blue-100">
          <Avatar name={'r'}/>
          <div className="">
            <p className="font-bold text-textColor">Name</p>
            <p className="text-gray-600">message goes here</p>
          </div>
        </li>

        
      <div className="bg-tileColor p-1">
      <form action="" className="flex gap-2">
        <input type="text" className="border rounded-xl flex-grow bg-white px-3" placeholder="enter your message"/>
        <button type="submit" className="bg-white text-primary px-2 py-1 rounded"><i className="ri-send-plane-2-fill"></i></button>
      </form>
      </div>
      </ul>
    </Section>
  )
};

export default DiscussionPanel;