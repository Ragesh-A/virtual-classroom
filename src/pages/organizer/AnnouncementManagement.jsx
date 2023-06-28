import { useEffect, useState } from 'react';
import AnnouncementCard from '../../components/organizer/AnnouncementCard';
import announcementServices from '../../services/announcementService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';

const AnnouncementManagement = () => {
  const dispatch = useDispatch();
  const [announcements, setAnnouncements] = useState();

  useEffect(() => {
    const promise = announcementServices.getAllAnnouncement();
    promise.then((res) => {
      if (res?.success) setAnnouncements(res?.success?.announcements);
      else dispatch(setNotification({ success: false, message: res?.error }));
    });
    promise.catch((err) => {
    });
  }, [dispatch]); 
  return (
    <div className="">
      <div className="flex gap-2 flex-col">
        {announcements &&
          announcements?.map((announcement, index) => (
            <AnnouncementCard
              key={announcement?._id}
              announcement={announcement}
            />
          ))}
      </div>
    </div>
  );
};

export default AnnouncementManagement;
