import { useState } from 'react';
import Box from '../../components/common/Box';
import CreateAnnouncement from '../../components/instructor/CreateAnnouncement';
import ListAnnouncements from './ListAnnouncement';

const AnnouncementManagement = () => {

  const [tab, setTab] = useState('view');

  return (
    <div className="h-full rounded-md mb-10">
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-2">
        <Box className="bg-gradient-to-br from-lightPrimary to-primary text-white p-2">
          <p className="mb-1 rounded xl:p-3 text-[10px] md:text-[14px] flex items-center">
            <i className="fa-solid fa-triangle-exclamation xl:text-5xl"></i>
            <span className="ml-3">
              Announcement automatically delete after 3 days later
            </span>
          </p>
        </Box>
        <Box className="bg-tileColor"></Box>
        <Box className="bg-tileColor"></Box>
      </div>

      <div className="box xl:pt-1 xl:px-3 mb-2">
        <ul className='flex md:gap-5 uppercase text-sm font-bold text-textColor'>
          <li className={`cursor-pointer border-4  border-transparent px-2 py-1 ${tab === 'view' ? 'border-b-primary' : ''}`} onClick={()=>setTab('view')}>
            View
          </li>
          <li className={`cursor-pointer border-4 border-transparent px-2 py-1 ${tab === 'create' ? 'border-b-primary' : 'border-red-500'}`} onClick={()=>setTab('create')}>
            create
          </li>
        </ul>
      </div>
      <div className="">
        {
          tab === 'create' && <CreateAnnouncement />
        }
        {
          tab === 'view' && <ListAnnouncements />
        }
      </div>

    </div>
  );
};

export default AnnouncementManagement;
