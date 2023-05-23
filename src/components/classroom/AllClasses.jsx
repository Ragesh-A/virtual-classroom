import { useEffect, useState } from 'react';
import Section from '../layouts/Section';
import Shimmer from '../common/Shimmer';
import ClassCards from '../classroom/ClassCards';
import classServices from '../../services/classServices';
import { useDispatch, useSelector } from 'react-redux';
import { storeClasses } from '../../utils/store/classesSlice';

const AllClasses = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [classes, setClasses] = useState([]);
  const dispatch = useDispatch()
  const storeClass = useSelector((store) => store.classes);
  useEffect(() => {
    if (!storeClass.classes) {
      classServices.getAllClasses().then((res) => {
        setClasses(res.classes);
        dispatch(storeClasses(res.classes))
        setIsLoaded(true);
      });
    }else{
      setClasses(storeClass.classes)
      setIsLoaded(true);
    }
  }, []);

  return (
    <Section>
      {!isLoaded ? (
        <>
          <Shimmer />
          <Shimmer />
          <Shimmer />
        </>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ClassCards classes={classes} />
        </div>
      )}
    </Section>
  );
};

export default AllClasses;
