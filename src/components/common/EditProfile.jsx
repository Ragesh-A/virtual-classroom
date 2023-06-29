import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_PATH } from '../../constant/constant';
import { useState } from 'react';
import * as Yup from 'yup';
import authServices from '../../services/authService';
import { setNotification } from '../../utils/store/uiSlice';
import { userLogin } from '../../utils/store/userSlice';
import defaultUser from '../../assets/images/defaultUserProfile.png'
import Button from './Button';

const validationSchema = Yup.object({
  name: Yup.string().required(),
  image: Yup.mixed().nullable(),
});

const EditProfile = () => {
  const { user } = useSelector((store) => store.user);
  const [profilePic, setProfilePic] = useState();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { values, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: user,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setLoading(true)
        authServices.updateProfile(values).then((res) => {
          setLoading(false)
          if (res?.success.user) {
            dispatch(userLogin(res?.success?.user))
            dispatch(setNotification({ success: true, message: 'Updated successfully'}))
          }
        });
      },
    });

  const imageHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  if (errors?.name) {
    dispatch(setNotification({ success: false, message: errors?.name }))
  }

  return (
    <div className="flex w-full min-h-[80vh] justify-center items-center">
      <div className="shadow rounded-md p-2">
        {user && (
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <img
                src={
                  profilePic
                    ? profilePic
                    : user?.avatar ? `${IMAGE_PATH}profiles/${user?.avatar}` : defaultUser
                }
                alt=""
                className="border-4 border-primary h-[8rem] rounded-full w-[8rem] flex justify-center items-center m-auto my-5 overflow-hidden"
              />

              <label
                htmlFor="image"
                className=" absolute z-[3] p-2 bg-primary border-2 border-white rounded-full bottom-0 right-[25%] cursor-pointer text-white w-10 grid place-items-center h-10"
              >
                <i className="fa-solid fa-pen"></i>
              </label>
              <input
                type="file"
                name="image"
                id="image"
               
                accept="image/*"
                onChange={(e) => {
                  imageHandle(e);
                  setFieldValue('avatar', e.target.files[0]);
                }}
                className="hidden"
              />
            </div>
            <div className="px-3">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                id="name"
                type="text"
                value={values?.name || ''}
                onChange={handleChange}
                className="ml-3 outline-none"
              />
            </div>
            {/* <div className="px-3">
            <label htmlFor="emailOrPhone">Email</label>
            <input name="emailOrPhone" id="emailOrPhone" type="text" value={values?.emailOrPhone} onChange={handleChange} className="ml-3 outline-none"/>
          </div> */}
            <Button type='submit' className='bg-primary text-white w-full rounded' loading={loading} >Update</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
