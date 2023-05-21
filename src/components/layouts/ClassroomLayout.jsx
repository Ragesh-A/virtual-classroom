import Section from "./Section";
import Shimmer from '../common/Shimmer'
import ClassroomHeader from "../classroom/ClassroomHeader";

const ClassroomLayout = () => {


  return (
    <>
    <ClassroomHeader/>
    <Section>
      <Shimmer />
      <Shimmer />
      <Shimmer />
    </Section>
    </>
  )
}

export default ClassroomLayout;