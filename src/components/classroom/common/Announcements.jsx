import { useEffect, useState } from 'react';
import announcementServices from '../../../services/announcementService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../../utils/store/uiSlice';
import AnnouncementCard from './AnnouncementCard';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = announcementServices.getUserAnnouncement();
    promise.then((res) => {
      console.log(res.success);
      if (res?.success) {
        setAnnouncements(res?.success?.announcements);
      } else {
        dispatch(setNotification({ success: false, message: res.error }));
      }
    });
  }, []);


  if (!announcements) return <></>;

  return (
    <div className="flex flex-wrap overflow-x-scroll scroll gap-2 p-2 mb-2">
      {announcements?.map((announcement) => (
        <AnnouncementCard
          title={announcement?.title}
          description={announcement?.description}
          key={announcement?._id}
          icon={announcement?.icon}
          theme={announcement?.theme}
          buttonName={announcement?.action && 'go'}
          action={announcement?.action}
        />
      ))}
    </div>
  );
};

export default Announcements;
