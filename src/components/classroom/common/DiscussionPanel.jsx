import Section from "../../layouts/Section"
import SideBar from "../student/SideBar";
import './DiscussionPanel.css'

const DiscussionPanel = () => {
  return(
    <Section className="relative min-h-full bg-red-500" >
      <SideBar />
      <div className="classroom-task-body">hhjb</div>
    </Section>
  )
};

export default DiscussionPanel;