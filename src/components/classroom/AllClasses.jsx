import { useState } from "react";
import Section from "../layouts/Section";
import Shimmer from '../common/Shimmer'
import ClassCards from '../classroom/ClassCards'
import classServices from "../../services/classServices";

const AllClasses = () => {

  const [isLoaded, setIsLoaded] = useState(false)
  classServices.getAllClasses().then(res=>{
    setIsLoaded(true)
  })

  return (
    <Section>
      { !isLoaded ? <>
      <Shimmer />
      <Shimmer />
      <Shimmer />
      </>: <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ClassCards />
      </div>
      }
    </Section>
  )
}

export default AllClasses;