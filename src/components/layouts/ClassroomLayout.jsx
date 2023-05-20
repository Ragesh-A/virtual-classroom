import { useEffect, useState } from "react";
import AnnouncementCard from "../classroom/AnnouncementCard";
import ClassCard from "../classroom/ClassCard";
import Header from "../common/Header";
import authServices from "../../services/authService";
import { useNavigate } from "react-router-dom";
import classServices from "../../services/classServices";
import CreateClass from "../classroom/createClass";
import { useSelector } from "react-redux";

const ClassroomLayout = ()=>{
  const navigate  = useNavigate()
  const [classes, setClasses]= useState(false)
  const [visible, setVisible] = useState(false)
  const user = useSelector(store=>store.user)
  console.log(user);
  useEffect(()=>{
    authServices.checkToken().then(token=>{
      if(!token){
        navigate('/auth/login')
      }
    })
    classServices.getAllClasses().then(res=>{
      setClasses(res?.success?.classes)
    })
  },[]);
  const listItems = [
    { title: 'My class', path: '/' },
    { title: 'Add / join', path: '#' },
    { title: 'Meet up', path: '/meet-up' },
  ];
  const button = {
    title: 'Profile',
    path: '/profile',
  };
  return (
    <>
    {visible && <CreateClass visible={visible} />}
    <Header list={listItems} button={button}/>
    <div className="flex gap-3 overflow-x-scroll p-5 px-12 scroll-none">
      <AnnouncementCard />
      <AnnouncementCard />
      <AnnouncementCard />
      <AnnouncementCard />
      <AnnouncementCard />
    </div>
    <div className="flex flex-wrap gap-5 justify-around relative px-5">
      {!classes ? <>
      <ClassCard to='/jhjsdfhushd'/>
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard /></>: classes?.map(singleClass => {
        <ClassCard key={singleClass?._id}/>
      })}
    </div>
    </>
  )

}

export default ClassroomLayout;