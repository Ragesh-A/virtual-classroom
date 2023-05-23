import Section from "../../layouts/Section"
import StudentTile from "../Lecture/StudentTile";
import SideBar from "../student/SideBar";
import AssignmentBar from "./AssignmentBar";
import './DiscussionPanel.css'

const DiscussionPanel = () => {
  return(
    <Section className="relative" >
      <SideBar />
      <div className="classroom-task-body">
        <div className="bg-lightPrimary p-2 px-5 flex justify-between rounded-md items-center capitalize">
          <p className="text-white font-bold">Computer science</p>
          <button className="bg-white px-4 py-2 rounded font-semibold">Requests</button>
        </div>
        <StudentTile />
        <StudentTile />
        <StudentTile />
      </div>
    </Section>
  )
};

export default DiscussionPanel;