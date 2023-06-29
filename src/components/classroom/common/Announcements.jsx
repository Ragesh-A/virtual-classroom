import { useEffect, useState } from 'react';
import announcementServices from '../../../services/announcementService';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../../utils/store/uiSlice';
import AnnouncementCard from './AnnouncementCard';
import { useParams } from 'react-router-dom';
import Shimmer from '../../common/Shimmer';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState();
  const dispatch = useDispatch();
  const {classId} = useParams()
  const { currentClass } = useSelector(store => store.classes)
  const { user } = useSelector(store => store.user)
  

  useEffect(() => {
    const promise = announcementServices.getClassAnnouncement(classId);
    promise.then((res) => {
      if (res?.success) {
        setAnnouncements(res?.success?.announcements);
      } else {
        dispatch(setNotification({ success: false, message: res?.error || 'Network error' }));
      }
    });
  }, [classId, dispatch]);


  if (!announcements) return <Shimmer/>;

  return (
    <div className="flex overflow-x-scroll scroll gap-2 p-2 mb-2 md:mb-5">
      {announcements?.map((announcement) => (
        <AnnouncementCard
          title={announcement?.title}
          description={announcement?.description}
          key={announcement?._id}
          icon={announcement?.icon}
          theme={announcement?.theme}
          buttonName={announcement?.action === 'to-works' ? 'works' : ''}
          action={announcement?.action !== 'to-works' ? '' : currentClass?.class?.createdBy !== user?._id && currentClass?.class?.instructor?._id !== user?._id ? 'works/' : '' }
        />
      ))}
    </div>
  );
};

export default Announcements;
