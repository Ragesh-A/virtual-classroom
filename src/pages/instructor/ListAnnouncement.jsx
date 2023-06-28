import { useEffect, useState } from "react";
import announcementServices from "../../services/announcementService";
import { useParams } from "react-router-dom";
import ConfirmBox from "../../components/common/ConfirmBox";
import { useDispatch } from "react-redux";
import { setNotification } from "../../utils/store/uiSlice";

const ListAnnouncements = () => {
  const [announcements, setAnnouncements] = useState();
  const { classId } = useParams()
  const [popup, setPopup] = useState()
  const [selected, setSelected] = useState();
  const dispatch = useDispatch()

  useEffect(() => {
    announcementServices.getAllClassAnnouncement(classId).then(res => {
      if (res?.success) {
        setAnnouncements(res?.success?.announcements)
      }
    })
  }, [classId])

  const deleteHandle = (id) => {
    setSelected(id)
    setPopup(true)
  };

  const confirmDelete = () => {
    announcementServices.deleteAnnouncement(selected).then(res => {
      if (res?.success) {
        setAnnouncements(prev => prev.filter(({_id}) => _id !== selected))
      } else {
        dispatch(setNotification({ success: false, message: res?.error}))
      }
    })
  }

  return (
    <div className="overflow-x-scroll scroll">
      <ConfirmBox visible={popup} setVisibleFn={setPopup} accepted={confirmDelete} title={'Want to delete'}/>
      <table cellSpacing={2} className="w-full text-center rounded-md">
        <thead className="bg-primary text-white rounded-md">
          <tr className="text-[10px] md:text-base">
            <th className="py-1">Title</th>
            <th className="py-1">Description</th>
            <th className="py-1">Announce at</th>
            <th className="py-1">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm xl:text-base w-full">
          {
            announcements?.map(announcement => (
              <tr key={announcement?._id} className="hover:bg-indigo-100">
                <td className="min-w-[100px] py-1">{announcement?.title}</td>
                <td className="min-w-[100px] overflow-scroll scroll max-w-[250px] py-1">{announcement?.description}</td>
                <td className="min-w-[100px] py-1">{announcement?.announceAt}</td>
                <td className="min-w-[100px]"><button onClick={()=>deleteHandle(announcement._id)} className="hover:bg-red-500 hover:text-white p-1 rounded">delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
};

export default ListAnnouncements;