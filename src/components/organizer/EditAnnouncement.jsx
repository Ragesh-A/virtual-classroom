import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  announcementInitialValue,
  announcementSchema,
} from '../../schema/schema';
import announcementServices from '../../services/announcementService';
import { setNotification } from '../../utils/store/uiSlice';
import Button from '../common/Button';
import AnnouncementCard from '../classroom/common/AnnouncementCard';
import Shimmer from '../common/Shimmer';
import organizerServices from '../../services/organizerServices';
import { filterClassIds } from '../../utils/test';

const EditAnnouncement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { announcementId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState();
  const [classes, setClasses] = useState()
  const [filteredClasses, setFilteredClasses] = useState()

  useEffect(() => {
    const announcementPromise = announcementServices.getAnnouncement(announcementId);
    const classesPromise = organizerServices.allClasses()
    announcementPromise.then((res) => {
      if (res?.error) {
        dispatch(
          setNotification({ success: false, message: 'No such Announcements' })
        );
        navigate(-1);
      }
      if (res?.success?.announcement) {
        setAnnouncement(res?.success?.announcement);
      }
    });
    classesPromise.then(res => {
      setClasses(res?.success?.classes)
      // setFilteredClasses(res?.success?.classes)
    })
  }, [announcementId]);

  const { values, errors, handleChange, handleSubmit, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: announcement || announcementInitialValue,
    validationSchema: announcementSchema,

    onSubmit: (values) => {
      setIsLoading(true);
      values.classes = filterClassIds(values.classes)
      const { _id, ...data } = values
      const promise = announcementServices.updateAnnouncement(data, _id);
      promise.then((res) => {
        setIsLoading(false);
        if (res?.success) {
          dispatch(
            setNotification({ success: true, message: 'Updated successfully' })
          );
        } else {
          dispatch(setNotification({ success: false, message: res?.error }));
          navigate(-1)
        }
      });
    },
  });

  const handleRemoveClass = (classId) => {
    if (announcement.classes.length <= 1 ){
      dispatch(setNotification({ success: false, message: 'At least one class is required' }))
      return 
    }
    setAnnouncement((prevAnnouncement) => {
      const updatedClasses = prevAnnouncement.classes.filter(
        (classItem) => classItem._id !== classId
      );
      return {
        ...prevAnnouncement,
        classes: updatedClasses,
      };
    });
  };

  const handleClassAdd = (singleClass) => {
    const isClassExist = announcement.classes.some(
      (existingClass) => existingClass._id === singleClass._id
    );
    if (!isClassExist){
    setAnnouncement((prevAnnouncement) => {
        const updatedClasses = [...prevAnnouncement.classes, singleClass];
        return {
          ...prevAnnouncement,
          classes: updatedClasses,
        };
        
      });
    }
  };

  const filterClass = (search) => {
    // if (!search.trim()) {
    //   return setFilteredClasses([])
    // }
    const filtered = classes.filter(single => single?.name.toLowerCase().includes(search.trim().toLowerCase()))
    setFilteredClasses(filtered)
  }

  const getCurrentDate = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    return currentDate;
  };




  if (!announcement) return <Shimmer />;

  return (
    <div className="md:p-3" disableTabSwitch >
      <AnnouncementCard
        title={values.title}
        description={values.description}
        buttonName="join"
        icon={values.icon}
        theme={values.theme}
      />

      <form onSubmit={handleSubmit} className="py-3">
        <div className="grid xl:grid-cols-2 gap-1 xl:gap-5">
          <div>
            <label htmlFor="title">
              Title
              {errors?.title && (
                <span className="text-red-500"> {errors?.title}</span>
              )}
            </label>
            <div className="flex relative border-b-4 border-primary rounded p-2 shadow transition bg-white">
              <input
                name="title"
                id="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">
              Description
              {errors?.description && (
                <span className="text-red-500"> {errors?.description}</span>
              )}
            </label>
            <div className="flex relative border-b-4 border-primary rounded p-2 shadow transition bg-white">
              <input
                name="description"
                id="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="action">
              Action
              {errors?.action && (
                <span className="text-red-500"> {errors?.action}</span>
              )}
            </label>
            <div className="flex relative border-b-4 border-primary rounded p-2 shadow transition bg-white">
              <select
                name="action"
                id="action"
                value={values.theme}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full outline-none"
              >
                <option value="to-class">To class</option>
                <option value="to-works">To work</option>
                <option value="to-discussion">To discussion</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="icon">
              Icon
              {errors?.icon && (
                <span className="text-red-500"> {errors?.icon}</span>
              )}
            </label>
            <div className="flex relative border-b-4 border-primary rounded p-2 shadow transition bg-white">
              <select
                name="icon"
                id="icon"
                value={values.icon}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full outline-none"
              >
                <option value="fa-solid fa-clipboard-list">
                  Assignment icon
                </option>
                <option value="fa-solid fa-calendar-days">Calender icon</option>
                <option value="fa-solid fa-phone">Call icon</option>
                <option value="fa-solid fa-list">List icon</option>
                <option value="fa-solid fa-medal">Medal icon</option>
                <option value="fa-solid fa-photo-film">Media icon</option>
                <option value="ri-play-circle-line">Play icon</option>
                <option value="fa-solid fa-face-smile">Smile icon</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="theme">
              Theme
              {errors?.theme && (
                <span className="text-red-500"> {errors?.theme}</span>
              )}
            </label>
            <div className="flex relative border-b-4 border-primary rounded p-2 shadow transition bg-white">
              <select
                name="theme"
                id="theme"
                value={values.theme}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full outline-none"
              >
                <option value="black">Black</option>
                <option value="danger">Danger</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="hope">Hope</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="announceAt">
              Announce date
              <span className="text-red-500"> {errors?.announceAt}</span>
            </label>
            <div className="flex relative border-b-4 border-primary rounded p-2 shadow transition bg-white">
              <input
                type="date"
                name="announceAt"
                id="announceAt"
                value={values.announceAt}
                min={getCurrentDate()}
                onChange={handleChange}
                onBlur={handleBlur}
                className="outline-none ps-3 w-full bg-white"
              />
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="flex flex-wrap py-2 gap-3">
                {announcement.classes &&
                  announcement.classes?.map((single) => (
                    <div className="bg-primary text-white p-1 px-2 text-sm rounded flex items-center justify-center"  key={single?._id}>
                      <p className="uppercase">{single?.name}</p>
                      <i className="fa-solid fa-xmark p-1 cursor-pointer" onClick={() => handleRemoveClass(single._id)}></i>
                    </div>
                  ))}
              </div>
              <div className="">
                <div className="flex bg-white border-2 p-1 px-3 rounded-md items-center">
                  <input type="text" onChange={e=> filterClass(e.target.value)} className='flex-grow outline-none'/>
                  <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                </div>
                <div className="relative bg-green-500">
                  <ul className='flex flex-col gap-1 mt-1 w-full'>
                   {!filteredClasses && <li className='max-h-[50px] overflow-hidden'><Shimmer /></li>}
                   {!filteredClasses && <li className='max-h-[50px] overflow-hidden'><Shimmer /></li>}
                   {
                    filteredClasses && filteredClasses?.map(single => (
                      <li className='bg-white hover:bg-indigo-200  px-2' key={single?._id} onClick={() =>handleClassAdd(single)}>{single?.name}</li>
                    ))
                   }
                  </ul>
                </div>
              </div>
            </div>
          </div>
       <div className="flex items-center justify-center">
       <Button
          className="bg-primary text-white rounded mt-2 px-4 py-2 max-w-[150px]"
          type="submit"
          loading={isLoading}
        >
          update
        </Button>
       </div>
        </div>
      </form>
    </div>
  );
};

export default EditAnnouncement;
