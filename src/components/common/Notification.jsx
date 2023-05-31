import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../utils/store/uiSlice";
import { useEffect, useState, useRef } from "react";

const Notification = () => {

  const { notification } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const success = notification?.success;
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      close();
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [notification]);

  const close = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
      dispatch(setNotification(false));
    }, 1000);
  };

  return (
    <>
      {notification && (
        <div
          className={`fixed right-8 z-10 w-[250px] border-l-[6px] p-2 h-14 flex items-center rounded-md overflow-hidden px-3 notification ${
            success
              ? 'border-l-primary shadow text-primary bg-white'
              : 'border-l-red-500 bg-red-100 text-red-500 shadow-red-500'
          } ${show ? 'show': show !== undefined ? 'hide' : ''}`}
        >
          <div className="relative w-full">
            {!success ? (
              <i className="fa-solid fa-triangle-exclamation"></i>
            ) : (
              <i className="fa-solid fa-thumbs-up"></i>
            )}
            <span className="ml-3">{notification?.message}</span>
            <div className="absolute right-0 top-0 cursor-pointer">
              <i className="fa-solid fa-xmark" onClick={close}></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export function useNotification(){
  return function Test (success = false, message = '' ){
    const dispatch = useDispatch();
    dispatch(setNotification({success, message}))

  }
}

export default Notification;
