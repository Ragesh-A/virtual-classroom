import { useState } from 'react';
import { useFormik } from 'formik';
import Button from '../common/Button';
import AnnouncementCard from '../classroom/common/AnnouncementCard';
import {
  announcementInitialValue,
  announcementSchema,
} from '../../schema/schema';
import { useParams } from 'react-router-dom';
import announcementServices from '../../services/announcementService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';

const CreateAnnouncement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { classId } = useParams()
  const dispatch = useDispatch()

  const { values, errors, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: announcementInitialValue,
    validationSchema: announcementSchema,
    onSubmit: (values) => {
      console.log(values);
      setIsLoading(true)
      values.classes = [classId]
      const promise =  announcementServices.createAnnouncement(values)
      promise.then(res => {
       setIsLoading(false)
      if (res?.success){
        dispatch(setNotification({ success: true, message: 'Created successfully' }))
      }else{
        dispatch(setNotification({ success: false, message: res?.error }))
      }
     })

    },
  });

  return (
    <div className="md:pt-3 px-1">
      <AnnouncementCard
        title={values.title}
        description={values.description}
        buttonName="go"
        icon={values.icon}
        theme={values.theme}
      />

      <form onSubmit={handleSubmit} className="py-3">
        <div className="grid xl:grid-cols-2 gap-1 xl:gap-5">
          <div>
            <label htmlFor="title">Title{errors?.title&&<span className='text-red-500'> {errors?.title}</span>}</label>
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
            <label htmlFor="description">Description{errors?.description&&<span className='text-red-500'> {errors?.description}</span>}</label>
            <div className="flex relative border-b-4 border-primary rounded p-2 shadow transition bg-white">
              <textarea
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
            <label htmlFor="action">Action{errors?.action&&<span className='text-red-500'> {errors?.action}</span>}</label>
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
            <label htmlFor="icon">Icon{errors?.icon && <span className='text-red-500'> {errors?.icon}</span>}</label>
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
            <label htmlFor="theme">Theme{errors?.theme && <span className='text-red-500'> {errors?.theme}</span>}</label>
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
            <label htmlFor="announceAt">Announce date<span className='text-red-500'> {errors?.announceAt}</span></label>
            <div className="flex relative border-b-4 border-primary rounded p-2 shadow transition bg-white">
              <input
                type="date"
                name="announceAt"
                id="announceAt"
                value={values.announceAt}
                min={(() => new Date().toISOString().split('T')[0])()}
                onChange={handleChange}
                onBlur={handleBlur}
                className="outline-none ps-3 w-full bg-white"
              />
            </div>
          </div>
        </div>
        <Button className='bg-primary w-full text-white rounded mt-2' type="submit" loading={isLoading}>
          create
        </Button>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
